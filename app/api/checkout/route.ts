import { NextResponse } from 'next/server';
import { COUPONS } from '@/lib/site';
import { getProduct } from '@/lib/products';

// Sipariş doğrulaması sunucuda yapılır: fiyatlar istemciden değil katalogdan okunur.
// Kart bilgisi bu uygulamaya hiç gelmez; kart ödemesi sağlayıcının barındırdığı sayfada alınır.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const { name, phone, email, billing, method, items, coupon } = body ?? {};

  if (typeof name !== 'string' || name.trim().length < 3) return bad('Ad soyad gerekli');
  if (typeof phone !== 'string' || phone.replace(/\D/g, '').length < 10) return bad('Geçerli bir telefon girin');
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad('Geçerli bir e-posta girin');
  if (!['card', 'eft'].includes(method)) return bad('Ödeme yöntemi seçin');
  if (!Array.isArray(items) || items.length === 0) return bad('Sepet boş');

  let subtotal = 0;
  for (const it of items) {
    const p = typeof it?.slug === 'string' ? getProduct(it.slug) : undefined;
    const qty = Number(it?.qty);
    if (!p || !p.inStock || !Number.isInteger(qty) || qty < 1 || qty > 10) return bad('Sepetteki ürünlerden biri geçersiz');
    subtotal += p.price * qty;
  }
  const rate = typeof coupon === 'string' ? COUPONS[coupon] ?? 0 : 0;
  const total = Math.round(subtotal * (1 - rate) * 100) / 100;

  const orderId = `SP-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  // TODO: siparişi veritabanına kaydet (billing: bireysel/kurumsal bilgisiyle birlikte).
  // TODO: method === 'card' ise ödeme sağlayıcısında (iyzico, PayTR, Stripe vb.) oturum oluştur ve
  //       sağlayıcının döndürdüğü ödeme sayfası adresini redirectUrl olarak ver.
  const providerUrl = process.env.PAYMENT_PROVIDER_CHECKOUT_URL;
  const redirectUrl =
    method === 'card' && providerUrl
      ? `${providerUrl}${providerUrl.includes('?') ? '&' : '?'}order=${orderId}`
      : `/siparis-tamamlandi?order=${orderId}&method=${method}`;

  return NextResponse.json({ orderId, total, billing, redirectUrl });
}

const bad = (error: string) => NextResponse.json({ error }, { status: 400 });
