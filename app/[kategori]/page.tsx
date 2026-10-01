import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CATEGORIES } from '@/lib/site';
import { byCategory } from '@/lib/products';
import { ProductListing } from '@/components/ProductListing';

type Props = { params: Promise<{ kategori: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => CATEGORIES.map((c) => ({ kategori: c.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params;
  const cat = CATEGORIES.find((c) => c.slug === kategori);
  return { title: cat ? `${cat.label} Satın Al - Ucuz Lisans Satın Al` : undefined };
}

export default async function CategoryPage({ params }: Props) {
  const { kategori } = await params;
  if (!CATEGORIES.some((c) => c.slug === kategori)) notFound();
  return <ProductListing products={byCategory(kategori)} active={kategori} />;
}
