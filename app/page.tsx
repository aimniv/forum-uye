import Link from 'next/link';
import { ArrowRight, Zap, ShieldCheck, Headphones } from 'lucide-react';
import { CATEGORIES, SITE } from '@/lib/site';
import { PRODUCTS } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';

export default function Home() {
  return (
    <>
      <section className="bg-[#111] text-white">
        <div className="container-x py-16 text-center">
          <h1 className="text-3xl font-extrabold md:text-4xl">{SITE.tagline}</h1>
          <p className="mx-auto mt-3 max-w-lg text-[11px] text-neutral-400">{SITE.description}</p>
          <Link href="/urunler" className="btn-brand mt-6 !px-5 !py-3">
            Ürünleri İncele <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </section>
      <div className="container-x py-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: Zap, t: 'Anında Teslimat', d: 'Ödeme sonrası ürününüz hemen hazır.' },
            { icon: ShieldCheck, t: 'Güvenli Ödeme', d: 'Kart bilgileriniz ödeme sağlayıcısında işlenir.' },
            { icon: Headphones, t: 'Destek', d: 'Aktivasyon sürecinde yanınızdayız.' },
          ].map(({ icon: I, t, d }) => (
            <div key={t} className="card flex items-center gap-3 p-4">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-green-50 text-brand">
                <I className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[11px] font-bold">{t}</div>
                <div className="text-[10px] text-neutral-500">{d}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} className="card px-4 py-2 text-[11px] font-medium hover:border-brand hover:text-brand">
              {c.label}
            </Link>
          ))}
        </div>
        <h2 className="mb-3 mt-8 text-base font-bold">Öne Çıkan Ürünler</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.filter((p) => p.inStock).slice(0, 8).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </>
  );
}
