import { PRODUCTS } from '@/lib/products';
import { ProductListing } from '@/components/ProductListing';

type Props = { searchParams: Promise<{ q?: string }> };

export const metadata = { title: 'Arama' };

export default async function Search({ searchParams }: Props) {
  const { q = '' } = await searchParams;
  const term = q.trim().toLocaleLowerCase('tr');
  const products = term ? PRODUCTS.filter((p) => `${p.name} ${p.category}`.toLocaleLowerCase('tr').includes(term)) : PRODUCTS;
  return <ProductListing key={term} products={products} />;
}
