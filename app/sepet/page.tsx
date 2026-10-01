'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Info, Lock, Trash2, Zap } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/site';
import { ProductArt } from '@/components/ProductArt';

export default function CartPage() {
  const cart = useCart();
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  if (cart.ready && cart.lines.length === 0) {
    return (
      <div className="container-x py-20 text-center">
        <h1 className="text-lg font-bold">Sepetiniz boş</h1>
        <Link href="/urunler" className="btn-brand mt-4 !px-5 !py-3">Alışverişe Başla</Link>
      </div>
    );
  }

  return (
    <div className="container-x grid gap-5 py-8 lg:grid-cols-[1fr_300px]">
      <div>
        <h1 className="mb-3 text-base font-bold">Sepetim <span className="text-xs font-normal text-neutral-500">({cart.count} Ürün)</span></h1>
        <div className="space-y-2">
          {cart.lines.map(({ product, qty }) => (
            <div key={product.slug} className="card flex items-center gap-3 p-3">
              <div className="w-14 shrink-0"><ProductArt product={product} small /></div>
              <div className="min-w-0 flex-1">
                <Link href={`/urun/${product.slug}`} className="block text-[11px] font-semibold leading-4">{product.name}</Link>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded bg-teal-50 px-1.5 py-0.5 text-[9px] font-semibold text-teal-700"><Zap className="h-2.5 w-2.5" />Hızlı Teslimat</span>
                  <div className="flex items-center rounded border border-neutral-200 text-[11px]">
                    <button className="px-2" onClick={() => cart.setQty(product.slug, qty - 1)} aria-label="Azalt">-</button>
                    <span className="w-4 text-center">{qty}</span>
                    <button className="px-2" onClick={() => cart.setQty(product.slug, qty + 1)} aria-label="Artır">+</button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm font-bold">{formatPrice(product.price * qty).replace(' TL', ' ₺')}</span>
                <button onClick={() => cart.remove(product.slug)} aria-label="Kaldır" className="text-neutral-400 hover:text-red-500"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[10px] text-neutral-500"><Info className="h-3 w-3" />Sepetinizdeki ürünler, satın alma işlemi tamamlanana kadar rezerve edilmez.</p>
      </div>

      <aside className="card h-fit p-4 text-[11px]">
        <h2 className="mb-3 text-xs font-bold">Sipariş Özeti</h2>
        <Row l="Ürünün Toplamı" v={formatPrice(cart.subtotal)} />
        <Row l="Kargo Toplam" v="0,00 TL" />
        <div className="flex justify-between py-1 text-green-700"><span className="flex items-center gap-1"><Zap className="h-3 w-3" />Anında Teslimat</span><span>Ücretsiz</span></div>
        <form
          className="my-3 flex gap-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            setErr(cart.applyCoupon(code) ? '' : 'Geçersiz kupon kodu');
            setCode('');
          }}
        >
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Kupon kodu" className="field !py-2" />
          <button className="rounded-md bg-neutral-800 px-3 text-[10px] font-semibold text-white">Uygula</button>
        </form>
        {err && <p className="mb-2 text-[10px] text-red-500">{err}</p>}
        {cart.coupon && (
          <div className="flex justify-between border-t border-neutral-100 py-2 font-semibold text-green-700">
            <span>Kupon İndirimi <button className="text-[9px] underline" onClick={cart.clearCoupon}>({cart.coupon}) kaldır</button></span>
            <span>-{cart.discount.toFixed(2)} ₺</span>
          </div>
        )}
        <div className="flex items-center justify-between border-t border-neutral-100 pt-3 text-sm font-bold text-brand">
          <span>Toplam</span><span>{formatPrice(cart.total)}</span>
        </div>
        <Link href="/checkout" aria-disabled={cart.lines.length === 0} className="btn-brand mt-4 w-full !py-3">Sepeti Onayla <ArrowRight className="h-3 w-3" /></Link>
        <div className="mt-3 flex items-center justify-center gap-1.5 rounded-full bg-green-50 py-2 text-[10px] font-semibold text-green-700"><Lock className="h-3 w-3" />Güvenli ve Şifreli Ödeme</div>
      </aside>
    </div>
  );
}

const Row = ({ l, v }: { l: string; v: string }) => (
  <div className="flex justify-between py-1"><span className="text-neutral-600">{l}</span><span>{v}</span></div>
);
