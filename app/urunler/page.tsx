import { PRODUCTS } from '@/lib/products';
import { ProductListing } from '@/components/ProductListing';

export const metadata = { title: 'Tüm Ürünler' };

export default function AllProducts() {
  return <ProductListing products={PRODUCTS} />;
}
