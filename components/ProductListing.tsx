'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { CATEGORIES } from '@/lib/site';
import type { Product } from '@/lib/products';
import { ProductCard } from './ProductCard';

export function ProductListing({ products, active }: { products: Product[]; active?: string }) {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [applied, setApplied] = useState<{ min: number; max: number }>({ min: 0, max: Infinity });
  const [sort, setSort] = useState('recommended');

  const list = useMemo(() => {
    const l = products.filter((p) => p.price >= applied.min && p.price <= applied.max);
    if (sort === 'price-asc') return [...l].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') return [...l].sort((a, b) => b.price - a.price);
    if (sort === 'rating') return [...l].sort((a, b) => b.rating - a.rating);
    return l;
  }, [products, applied, sort]);

  const apply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied({ min: min ? Number(min) : 0, max: max ? Number(max) : Infinity });
  };
  const reset = () => {
    setMin('');
    setMax('');
    setApplied({ min: 0, max: Infinity });
  };

  const catLink = (href: string, label: string, on: boolean) => (
    <li key={href}>
      <Link href={href} className={`flex items-center gap-1.5 py-1.5 text-[10px] ${on ? 'font-bold text-brand' : 'text-neutral-600 hover:text-brand'}`}>
        <ChevronRight className="h-2.5 w-2.5" />
        {label}
      </Link>
    </li>
  );

  return (
    <div className="container-x grid gap-4 py-3 md:grid-cols-[170px_1fr]">
      <aside className="card h-fit p-4">
        <h3 className="mb-2 text-[10px] font-bold">İlgili Kategoriler</h3>
        <ul>
          {catLink('/urunler', 'Tüm Ürünler', !active)}
          {CATEGORIES.map((c) => catLink(`/${c.slug}`, c.label, active === c.slug))}
        </ul>
        <form onSubmit={apply} className="mt-4 border-t border-neutral-100 pt-4">
          <h3 className="mb-2 text-[10px] font-bold">Fiyat Aralığı</h3>
          <div className="flex items-center gap-1.5">
            <input value={min} onChange={(e) => setMin(e.target.value)} inputMode="numeric" placeholder="En Az" className="field !px-2 !py-1.5 !text-[10px]" />
            <span className="text-neutral-400">–</span>
            <input value={max} onChange={(e) => setMax(e.target.value)} inputMode="numeric" placeholder="En Çok" className="field !px-2 !py-1.5 !text-[10px]" />
          </div>
          <button className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md bg-neutral-100 py-2 text-[10px] font-medium hover:bg-neutral-200">
            <Search className="h-3 w-3" /> Ara
          </button>
        </form>
        <button onClick={reset} className="mt-4 w-full border-t border-neutral-100 pt-4 text-center text-[9px] text-neutral-500 hover:text-brand">
          Filtreleri Temizle
        </button>
      </aside>
      <section>
        <div className="card mb-3 flex items-center justify-between px-4 py-2.5 text-[10px]">
          <span>
            <b>{list.length}</b> ürün listeleniyor
          </span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded border border-neutral-300 px-2 py-1 text-[10px]" aria-label="Sırala">
            <option value="recommended">Önerilen Sıralama</option>
            <option value="price-asc">Fiyat: Artan</option>
            <option value="price-desc">Fiyat: Azalan</option>
            <option value="rating">Puana Göre</option>
          </select>
        </div>
        {list.length === 0 ? (
          <div className="card p-10 text-center text-neutral-500">Aramanızla eşleşen ürün bulunamadı.</div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
