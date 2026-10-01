import { notFound } from 'next/navigation';
import { CORPORATE_PAGES } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => CORPORATE_PAGES.map((p) => ({ slug: p.slug }));

export default async function Corporate({ params }: Props) {
  const { slug } = await params;
  const page = CORPORATE_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <div className="container-x py-10">
      <div className="card p-8">
        <h1 className="text-xl font-bold">{page.label}</h1>
        {/* Hukuki metinleri (özellikle iade koşulları ve mesafeli satış sözleşmesi) kendi işletmene göre yaz. */}
        <p className="mt-4 text-xs text-neutral-500">Bu sayfanın içeriği henüz eklenmedi.</p>
      </div>
    </div>
  );
}
