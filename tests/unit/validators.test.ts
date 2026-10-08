import { describe, it, expect } from 'vitest';
import { contactSchema, quoteSchema, newsletterSchema, chatSchema } from '@/lib/validators';

describe('contactSchema', () => {
  it('accepts a valid submission', () => {
    expect(
      contactSchema.safeParse({
        name: 'Anne Muster',
        email: 'a@example.com',
        serviceLine: 'development',
        message: 'We need a custom CRM built.',
        consent: true,
        hp: '',
        captcha: '0123456789',
        locale: 'en',
      }).success,
    ).toBe(true);
  });

  it('rejects CR/LF in the name (header injection defense)', () => {
    expect(
      contactSchema.safeParse({
        name: 'a\r\nBcc: attacker@example.com',
        email: 'a@example.com',
        serviceLine: 'development',
        message: 'x'.repeat(20),
        consent: true,
        captcha: '0123456789',
      }).success,
    ).toBe(false);
  });

  it('rejects when honeypot is populated', () => {
    const parsed = contactSchema.safeParse({
      name: 'Anne',
      email: 'a@example.com',
      serviceLine: 'development',
      message: 'x'.repeat(20),
      consent: true,
      hp: 'i am a bot',
      captcha: '0123456789',
    });
    expect(parsed.success).toBe(false);
  });
});

describe('quoteSchema', () => {
  it('rejects unknown budget bands', () => {
    expect(
      quoteSchema.safeParse({
        serviceLine: 'development',
        scope: 'x'.repeat(20),
        timeline: '3 months',
        budget: 'wildly wrong',
        name: 'Anne',
        email: 'a@example.com',
        company: 'ACME',
        consent: true,
        captcha: '0123456789',
      }).success,
    ).toBe(false);
  });
});

describe('newsletterSchema', () => {
  it('requires explicit consent', () => {
    expect(
      newsletterSchema.safeParse({
        email: 'a@example.com',
        consent: false,
        captcha: '0123456789',
      }).success,
    ).toBe(false);
  });
});

describe('chatSchema', () => {
  it('caps history at 20 entries', () => {
    const many = Array.from({ length: 25 }).map(() => ({ role: 'user' as const, content: 'x' }));
    expect(chatSchema.safeParse({ message: 'hi', history: many }).success).toBe(false);
  });
});
