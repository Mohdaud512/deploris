import crypto from 'node:crypto';
import { serverEnv } from './env';

/**
 * HMAC-signed URL token for double opt-in confirmation links.
 * We use RESEND_API_KEY as the signing secret to avoid adding another env var * it's server-only and already required for the newsletter flow. Rotating it
 * invalidates all outstanding confirmation links, which is the correct
 * behavior on a key rotation.
 *
 * Token format: base64url(payload).base64url(sig)
 */

function key(): Buffer {
  const raw = serverEnv.RESEND_API_KEY ?? 'dev-only-signing-key';
  return crypto.createHash('sha256').update(raw).digest();
}

function b64url(buf: Buffer | string): string {
  return Buffer.from(buf).toString('base64url');
}

export function signToken(payload: object, ttlSeconds = 60 * 60 * 24 * 3): string {
  const body = { ...payload, exp: Math.floor(Date.now() / 1000) + ttlSeconds };
  const payloadStr = b64url(JSON.stringify(body));
  const sig = crypto.createHmac('sha256', key()).update(payloadStr).digest();
  return `${payloadStr}.${b64url(sig)}`;
}

export function verifyToken<T extends { exp: number }>(token: string): T | null {
  try {
    const [payloadStr, sigStr] = token.split('.');
    if (!payloadStr || !sigStr) return null;
    const expected = crypto.createHmac('sha256', key()).update(payloadStr).digest();
    const actual = Buffer.from(sigStr, 'base64url');
    // Constant-time compare reject forged signatures without timing leaks.
    if (expected.length !== actual.length || !crypto.timingSafeEqual(expected, actual)) return null;
    const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8')) as T;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
