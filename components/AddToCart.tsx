'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart';

export function AddToCart({ slug, inStock }: { slug: string; inStock: boolean }) {
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  if (!inStock) return <button disabled className="btn-brand mt-5 w-full !py-3">Stokta Yok</button>;
  return (
    <div className="mt-5 flex gap-2">
      <div className="flex items-center rounded-lg border border-neutral-200">
        <button type="button" className="px-3 py-2" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Azalt">-</button>
        <span className="w-6 text-center text-xs">{qty}</span>
        <button type="button" className="px-3 py-2" onClick={() => setQty((q) => Math.min(10, q + 1))} aria-label="Artır">+</button>
      </div>
      <button
        className="btn-brand flex-1 !py-3"
        onClick={() => {
          add(slug, qty);
          router.push('/sepet');
        }}
      >
        <ShoppingCart className="h-3.5 w-3.5" /> Sepete Ekle
      </button>
    </div>
  );
}
