'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Banknote, Building2, Check, ChevronLeft, CreditCard, Lock, Mail, Phone, ShieldCheck, User } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/site';
import { ProductArt } from '@/components/ProductArt';

const Steps = () => (
  <div className="flex items-center gap-3 text-[10px]">
    {[['Sepet', 'done'], ['Ödeme', 'on'], ['Tamamlandı', 'off']].map(([l, s], i) => (
      <div key={l} className="flex items-center gap-3">
        <span className={`flex items-center gap-1.5 ${s === 'off' ? 'text-neutral-400' : 'font-semibold'}`}>
          <span className={`grid h-5 w-5 place-items-center rounded-full text-[9px] text-white ${s === 'on' ? 'bg-brand' : s === 'done' ? 'bg-neutral-300' : 'bg-neutral-300'}`}>
            {s === 'done' ? <Check className="h-3 w-3" /> : i + 1}
          </span>
          {l}
        </span>
        {i < 2 && <span className="h-px w-12 bg-neutral-300" />}
      </div>
    ))}
  </div>
);

export default function Checkout() {
  const cart = useCart();
  const router = useRouter();
  const [f, setF] = useState({ name: '', phone: '', email: '' });
  const [billing, setBilling] = useState<'individual' | 'corporate'>('individual');
  const [method, setMethod] = useState<'card' | 'eft'>('card');
  const [terms, setTerms] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    if (cart.ready && cart.lines.length === 0) router.replace('/sepet');
  }, [cart.ready, cart.lines.length, router]);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setBusy(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, billing, method, coupon: cart.coupon, items: cart.lines.map((l) => ({ slug: l.product.slug, qty: l.qty })) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Bir hata oluştu');
      if (!data.redirectUrl.startsWith('/')) {
        window.location.href = data.redirectUrl; // ödeme sağlayıcısının güvenli sayfası
        return;
      }
      cart.clear();
      router.push(data.redirectUrl);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Bir hata oluştu');
      setBusy(false);
    }
  };

  const pill = (on: boolean) => `flex items-center gap-2 rounded-lg border px-4 py-3 text-left text-[11px] font-semibold transition ${on ? 'border-neutral-900 bg-neutral-900 text-white shadow' : 'border-transparent bg-neutral-50 text-neutral-600'}`;

  return (
    <div className="bg-neutral-100">
      <div className="container-x py-6">
        <div className="mx-auto flex max-w-[620px] items-center justify-between">
          <Link href="/sepet" className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold"><ChevronLeft className="h-3 w-3" />Sepete Dön</Link>
          <Steps />
          <span className="w-16" />
        </div>
        <form onSubmit={submit} className="mx-auto mt-6 grid max-w-[620px] gap-4 md:max-w-[720px] md:grid-cols-[1fr_200px]">
          <div className="card space-y-4 p-5">
            <h1 className="border-b border-neutral-100 pb-3 text-sm font-bold">Ödeme Bilgileri</h1>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field icon={User} label="Adınız Soyadınız"><input required minLength={3} value={f.name} onChange={set('name')} autoComplete="name" className="field !pl-9" /></Field>
              <Field icon={Phone} label="Telefon Numarası"><input required type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" placeholder="+90 5xx xxx xx xx" className="field !pl-9" /></Field>
            </div>
            <Field icon={Mail} label="E-Posta Adresi"><input required type="email" value={f.email} onChange={set('email')} autoComplete="email" className="field !pl-9" /></Field>

            <div>
              <div className="mb-1.5 text-[10px] font-bold">Fatura Bilgileri</div>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setBilling('individual')} className={pill(billing === 'individual')}><User className="h-3.5 w-3.5" />Bireysel</button>
                <button type="button" onClick={() => setBilling('corporate')} className={pill(billing === 'corporate')}><Building2 className="h-3.5 w-3.5" />Kurumsal</button>
              </div>
            </div>

            <div>
              <div className="mb-1.5 text-[10px] font-bold">Ödeme Yöntemi</div>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setMethod('card')} className={pill(method === 'card')}>
                  <CreditCard className="h-4 w-4" />
                  <span>Kredi / Banka Kartı<span className="block text-[8px] font-normal opacity-70">Güvenli ödeme sayfası</span></span>
                </button>
                <button type="button" onClick={() => setMethod('eft')} className={pill(method === 'eft')}>
                  <Banknote className="h-4 w-4" />
                  <span>Havale / EFT<span className="block text-[8px] font-normal opacity-70">Dekont ile bildirim</span></span>
                </button>
              </div>
              <p className="mt-2 text-[10px] text-neutral-500">
                {method === 'card'
                  ? 'Siparişi onayladığınızda kart bilgilerinizi girmek için ödeme sağlayıcısının güvenli sayfasına yönlendirilirsiniz. Kart bilgileri bu sitede girilmez ve saklanmaz.'
                  : 'Siparişi onayladıktan sonra havale bilgileri gösterilir.'}
              </p>
            </div>

            <label className="flex items-start gap-2 text-[10px]">
              <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-0.5" required />
              <span><Link href="/kurumsal/kullanim-sartlari" className="font-semibold text-brand">Kullanım şartlarını</Link>, <Link href="/kurumsal/iade-kosullari" className="font-semibold text-brand">iade politikasını</Link> ve <Link href="/kurumsal/kullanim-sartlari" className="font-semibold text-brand">mesafeli satış sözleşmesini</Link> okudum ve kabul ediyorum <span className="text-red-500">*</span></span>
            </label>
            {err && <p role="alert" className="text-[11px] text-red-500">{err}</p>}
            <button disabled={busy || !terms} className="btn-brand w-full !py-3.5 !text-[12px]"><Lock className="h-3.5 w-3.5" />{busy ? 'İşleniyor...' : `${formatPrice(cart.total)} Güvenli Öde`}</button>
            <p className="flex items-center justify-center gap-1.5 text-[9px] text-neutral-500"><ShieldCheck className="h-3 w-3" />Ödemeleriniz 256-bit SSL ile şifrelenir.</p>
          </div>

          <aside className="card h-fit p-4 text-[11px]">
            <h2 className="mb-3 text-xs font-bold">Sipariş Özeti</h2>
            {cart.lines.map(({ product, qty }) => (
              <div key={product.slug} className="mb-3 flex gap-2 border-b border-neutral-100 pb-3">
                <div className="w-9 shrink-0"><ProductArt product={product} small /></div>
                <div className="text-[10px]"><div className="font-semibold leading-3.5">{product.name}</div><div className="mt-1 text-neutral-500">{qty} Adet x {formatPrice(product.price)}</div></div>
              </div>
            ))}
            <div className="flex justify-between py-1"><span>Ara Toplam</span><span>{formatPrice(cart.subtotal)}</span></div>
            {cart.discount > 0 && <div className="flex justify-between py-1 font-semibold text-green-700"><span>İndirim</span><span>-{formatPrice(cart.discount)}</span></div>}
            <div className="mt-2 flex items-center justify-between border-t border-dashed border-neutral-200 pt-3 text-xs font-bold"><span>Toplam Tutar</span><span className="text-base text-brand">{formatPrice(cart.total)}</span></div>
          </aside>
        </form>
      </div>
    </div>
  );
}

function Field({ icon: I, label, children }: { icon: typeof User; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-bold">{label}</span>
      <span className="relative block">
        <I className="pointer-events-none absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-neutral-500" />
        {children}
      </span>
    </label>
  );
}
