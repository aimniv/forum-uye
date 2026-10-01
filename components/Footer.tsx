import Link from 'next/link';
import { Linkedin, Youtube } from 'lucide-react';
import { CATEGORIES, CORPORATE_PAGES, SITE } from '@/lib/site';
import { PRODUCTS } from '@/lib/products';
import { Logo } from './Logo';

const featured = ['google-ai-pro-18-ay', 'adobe-creative-cloud-pro', 'chatgpt-plus', 'office-365-12-aylik', 'windows-11-pro']
  .map((s) => PRODUCTS.find((p) => p.slug === s))
  .filter((p): p is NonNullable<typeof p> => !!p);

const heading = 'mb-4 text-[11px] font-bold text-white';
const item = 'flex items-center gap-2 text-[10px] text-neutral-400 hover:text-white before:h-1 before:w-1 before:rounded-full before:bg-brand before:content-[""]';

export function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-brand bg-[#111] text-neutral-400">
      <div className="container-x">
        <div className="grid gap-10 py-12 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-[260px] text-[10px] leading-5">{SITE.description}</p>
            <div className="mt-4 flex gap-2">
              <a href={SITE.social.linkedin} aria-label="LinkedIn" className="grid h-7 w-7 place-items-center rounded-full bg-neutral-800 text-white">
                <Linkedin className="h-3 w-3" />
              </a>
              <a href={SITE.social.youtube} aria-label="YouTube" className="grid h-7 w-7 place-items-center rounded-full bg-neutral-800 text-white">
                <Youtube className="h-3 w-3" />
              </a>
            </div>
          </div>
          <div>
            <h4 className={heading}>Ürünler</h4>
            <ul className="space-y-3">
              {featured.map((p) => (
                <li key={p.slug}>
                  <Link href={`/urun/${p.slug}`} className={item}>
                    {p.name.split('|')[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={heading}>Kategoriler</h4>
            <ul className="space-y-3">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className={item}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={heading}>Kurumsal</h4>
            <ul className="space-y-3">
              {CORPORATE_PAGES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/kurumsal/${c.slug}`} className={item}>
                    {c.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/iletisim" className={item}>
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 py-5 text-center text-[10px] text-neutral-500">
          © {new Date().getFullYear()} {SITE.name}{SITE.nameAccent}. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
