import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, formatPrice } from '@/lib/site';
import type { Product } from '@/lib/products';
import { ProductArt } from './ProductArt';
import { Stars } from './Stars';

export function ProductCard({ product }: { product: Product }) {
  const cat = CATEGORIES.find((c) => c.slug === product.category)?.label ?? '';
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  return (
    <div className="card flex flex-col p-2.5">
      <Link href={`/urun/${product.slug}`} className="relative block">
        <ProductArt product={product} />
        {discount > 0 && <span className="absolute right-2 top-2 rounded-md bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white">%{discount}</span>}
      </Link>
      <div className="flex flex-1 flex-col px-1 pt-3">
        <span className="text-[9px] font-bold uppercase tracking-wide text-brand">{cat}</span>
        <Link href={`/urun/${product.slug}`} className="mt-1 text-[11px] font-medium leading-4">
          {product.name}
        </Link>
        <div className="mt-1.5">
          <Stars rating={product.rating} reviews={product.reviews} />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[13px] font-bold">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="text-[10px] text-neutral-400 line-through">{formatPrice(product.oldPrice)}</span>}
        </div>
        <Link href={`/urun/${product.slug}`} className={`btn-brand mt-3 ${product.inStock ? '' : 'opacity-60'}`}>
          İncele <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
