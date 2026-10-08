import { serverEnv } from './env';

/**
 * hCaptcha server-side verification. All form routes MUST call this before
 * doing any state change. Never verify captchas from the client.
 */

export async function verifyHcaptcha(
  token: string | undefined | null,
  remoteip?: string,
): Promise<boolean> {
  // Fail closed if the key is missing in production.
  const secret = serverEnv.HCAPTCHA_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') return false;
    // Dev convenience only.
    // eslint-disable-next-line no-console
    console.warn('[captcha] HCAPTCHA_SECRET_KEY not set bypassing in dev.');
    return true;
  }
  if (!token || typeof token !== 'string' || token.length < 10) return false;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteip) body.set('remoteip', remoteip);
    const res = await fetch('https://api.hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
      cache: 'no-store',
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
