import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata = { title: 'Sipariş Alındı' };

export default async function Done({ searchParams }: { searchParams: Promise<{ order?: string; method?: string }> }) {
  const { order, method } = await searchParams;
  return (
    <div className="container-x py-20 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-brand" />
      <h1 className="mt-4 text-xl font-bold">Siparişiniz alındı</h1>
      {order && <p className="mt-2 text-xs text-neutral-500">Sipariş numaranız: <b>{order}</b></p>}
      <p className="mx-auto mt-2 max-w-md text-xs text-neutral-500">
        {method === 'eft' ? 'Havale bilgileri e-posta adresinize gönderilecektir. Ödemeniz onaylanınca ürününüz teslim edilir.' : 'Ürününüz e-posta adresinize iletilecektir.'}
      </p>
      <Link href="/urunler" className="btn-brand mt-6 !px-5 !py-3">Alışverişe Devam Et</Link>
    </div>
  );
}
