import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Check, Zap } from 'lucide-react';
import { CATEGORIES, formatPrice } from '@/lib/site';
import { PRODUCTS, getProduct } from '@/lib/products';
import { ProductArt } from '@/components/ProductArt';
import { Stars } from '@/components/Stars';
import { AddToCart } from '@/components/AddToCart';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => PRODUCTS.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return { title: p?.name };
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const cat = CATEGORIES.find((c) => c.slug === p.category)?.label;
  return (
    <div className="container-x py-6">
      <div className="card grid gap-8 p-6 md:grid-cols-2">
        <ProductArt product={p} />
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wide text-brand">{cat}</span>
          <h1 className="mt-1 text-lg font-bold leading-snug">{p.name}</h1>
          <div className="mt-2"><Stars rating={p.rating} reviews={p.reviews} /></div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-extrabold text-brand">{formatPrice(p.price)}</span>
            {p.oldPrice && <span className="text-sm text-neutral-400 line-through">{formatPrice(p.oldPrice)}</span>}
          </div>
          <span className="mt-3 inline-flex items-center gap-1 rounded bg-teal-50 px-2 py-1 text-[10px] font-semibold text-teal-700">
            <Zap className="h-3 w-3" /> Hızlı Teslimat
          </span>
          <p className="mt-4 text-xs leading-5 text-neutral-600">{p.description}</p>
          <ul className="mt-4 space-y-2">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs"><Check className="h-3.5 w-3.5 text-brand" />{f}</li>
            ))}
          </ul>
          <AddToCart slug={p.slug} inStock={p.inStock} />
        </div>
      </div>
    </div>
  );
}
