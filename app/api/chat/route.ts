import { NextRequest, NextResponse } from 'next/server';
import { chatSchema } from '@/lib/validators';
import { checkRateLimit, clientIp } from '@/lib/rateLimit';
import { serverEnv } from '@/lib/env';
import { ragSearch } from '@/lib/ragIndex';
import { escapeHtml, sendMail } from '@/lib/mail';
import { notifyLead } from '@/lib/notify';

export const runtime = 'nodejs';
export const preferredRegion = ['fra1'];

/**
 * RAG-grounded chat endpoint.
 *
 * Grok-ready: when serverEnv.XAI_API_KEY is set, we call xAI's chat API and
 * stream the tokens back. When it isn't, we return a clearly-labeled stub
 * answer built from the RAG context so the widget can be demoed end-to-end.
 *
 * SECURITY:
 * - Rate-limited per IP.
 * - Body zod-validated.
 * - XAI key server-only.
 * - Only the retrieved passages from our own content are sent to the LLM.
 * - Streams a text/plain body so the client's TextDecoder can render it.
 *
 * TODO: connect Grok set XAI_API_KEY in Vercel to flip from stub to live.
 */

const encoder = new TextEncoder();

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  const rl = await checkRateLimit('chat', ip);
  if (!rl.success) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body.' }, { status: 400 });
  }
  const parsed = chatSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid body.' }, { status: 400 });
  const d = parsed.data;

  // Lead capture branch: user handed us their contact details.
  if (d.message === '__lead_capture__' && d.lead) {
    const inbox = serverEnv.CONTACT_INBOX;
    const historyText = d.history.map((h) => `${h.role.toUpperCase()}: ${h.content}`).join('\n');
    if (inbox) {
      await sendMail({
        to: inbox,
        replyTo: d.lead.email,
        subject: `[Deploris] Chatbot lead ${d.lead.name}`,
        html: `<p><strong>${escapeHtml(d.lead.name)}</strong> (${escapeHtml(d.lead.email)}) locale ${escapeHtml(d.locale)}</p>
          <hr /><pre style="white-space:pre-wrap">${escapeHtml(historyText)}</pre>`,
        text: `${d.lead.name} (${d.lead.email}) locale ${d.locale}\n\n${historyText}`,
      });
    }
    await notifyLead({
      title: 'Chatbot lead',
      fields: [
        { label: 'Name', value: d.lead.name },
        { label: 'Email', value: d.lead.email },
        { label: 'Locale', value: d.locale },
      ],
    });
    return NextResponse.json({ ok: true });
  }

  const contextDocs = ragSearch(d.message, d.locale, 4);
  const contextBlock = contextDocs
    .map((c, i) => `[${i + 1}] ${c.title}\nURL: ${c.url}\n${c.content}`)
    .join('\n\n---\n\n');

  const systemPrompt = buildSystemPrompt(d.locale, contextBlock);

  // Live path (Grok / xAI).
  if (serverEnv.XAI_API_KEY) {
    try {
      const upstream = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${serverEnv.XAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: serverEnv.XAI_MODEL,
          stream: true,
          temperature: 0.2,
          messages: [
            { role: 'system', content: systemPrompt },
            ...d.history.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: d.message },
          ],
        }),
      });
      if (!upstream.ok || !upstream.body) {
        return streamStub(d.locale, contextDocs);
      }
      return new Response(passThroughStream(upstream.body), {
        headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
      });
    } catch {
      return streamStub(d.locale, contextDocs);
    }
  }

  // TODO: connect Grok no key configured, return a grounded stub answer.
  return streamStub(d.locale, contextDocs);
}

function buildSystemPrompt(locale: 'en' | 'de', context: string): string {
  const rulesEn = `You are Deploris's assistant. Answer ONLY based on the retrieved context below. If the context does not answer the question, say so briefly and suggest booking a call. Cite sources with the URL when relevant. Keep answers under 180 words unless the user asks for detail. Never invent product names, prices, SLAs, or numbers.`;
  const rulesDe = `Sie sind der KI-Assistent von Deploris. Antworten Sie ausschließlich auf Basis des unten stehenden Kontexts. Falls der Kontext die Frage nicht beantwortet, sagen Sie das kurz und schlagen Sie einen Termin vor. Zitieren Sie Quellen mit URL. Antworten Sie in höflichem Sie und unter 180 Wörtern, sofern nicht anders gewünscht. Erfinden Sie keine Produktnamen, Preise, SLAs oder Zahlen.`;
  return `${locale === 'de' ? rulesDe : rulesEn}\n\n### Retrieved context\n${context || '(no matches)'}`;
}

/**
 * Convert xAI's SSE-style stream to a plain text stream by extracting the
 * `delta.content` field from each `data: {...}` frame.
 */
function passThroughStream(input: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const reader = input.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  return new ReadableStream({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.startsWith('data:')) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === '[DONE]') continue;
        try {
          const json = JSON.parse(payload) as { choices?: { delta?: { content?: string } }[] };
          const delta = json.choices?.[0]?.delta?.content ?? '';
          if (delta) controller.enqueue(encoder.encode(delta));
        } catch {
          /* skip malformed frame */
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });
}

function streamStub(locale: 'en' | 'de', context: { title: string; url: string }[]): Response {
  const intro =
    locale === 'de'
      ? 'Kurze Vorschauantwort auf Basis unserer Inhalte (der produktive KI-Endpunkt ist noch nicht angebunden):\n\n'
      : 'A brief preview answer built from our own content (the live AI endpoint is not connected yet):\n\n';
  const list = context.length
    ? context.map((c) => `• ${c.title} ${c.url}`).join('\n')
    : locale === 'de'
      ? 'Ich habe dazu keinen passenden Abschnitt gefunden. Möchten Sie einen kurzen Termin buchen?'
      : "I couldn't find a matching section. Would you like to book a short call?";
  const body = `${intro}${list}\n\n${
    locale === 'de'
      ? 'Sobald der Key gesetzt ist, antwortet der Assistent in vollständigen Sätzen mit Quellenzitaten.'
      : 'Once the key is set, the assistant will answer in full sentences with source citations.'
  }`;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      // Chunk it a bit so the UI shows a streaming effect.
      const chunks = body.match(/.{1,40}/gs) ?? [body];
      let i = 0;
      const tick = () => {
        if (i >= chunks.length) {
          controller.close();
          return;
        }
        controller.enqueue(encoder.encode(chunks[i]!));
        i += 1;
        setTimeout(tick, 30);
      };
      tick();
    },
  });
  return new Response(stream, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
  });
}
