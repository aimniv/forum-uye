import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name, email, subject, message } = (await req.json().catch(() => ({}))) ?? {};
  const ok = (v: unknown, min: number) => typeof v === 'string' && v.trim().length >= min;
  if (!ok(name, 2) || !ok(subject, 2) || !ok(message, 5) || !ok(email, 5) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Lütfen tüm alanları doğru doldurun.' }, { status: 400 });
  }
  // TODO: mesajı e-posta (SMTP/Resend vb.) ile ilet veya veritabanına kaydet.
  return NextResponse.json({ ok: true });
}
