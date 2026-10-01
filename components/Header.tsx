'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, ShoppingCart, UserCircle } from 'lucide-react';
import { CATEGORIES } from '@/lib/site';
import { useCart } from '@/lib/cart';
import { Logo } from './Logo';

export function Header() {
  const { count } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (term) router.push(`/ara?q=${encodeURIComponent(term)}`);
  };

  const links = [{ href: '/', label: 'Ana Sayfa' }, ...CATEGORIES.map((c) => ({ href: `/${c.slug}`, label: c.label })), { href: '/iletisim', label: 'İletişim' }];

  return (
    <header className="bg-white">
      <div className="container-x">
        <div className="flex items-center justify-between gap-6 py-4">
          <Logo />
          <form onSubmit={submit} className="hidden max-w-[240px] flex-1 sm:block">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ürün, kategori veya marka ara..."
                className="field !rounded-lg !pr-9"
                aria-label="Ara"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-brand" aria-label="Ara">
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
          <div className="flex items-center gap-5 text-[10px]">
            <Link href="/sepet" className="relative flex flex-col items-center gap-0.5">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -right-2 -top-1.5 grid h-3.5 min-w-3.5 place-items-center rounded-full bg-brand px-1 text-[8px] font-bold text-white">
                {count}
              </span>
              Sepetim
            </Link>
            <Link href="/hesabim" className="flex flex-col items-center gap-0.5">
              <UserCircle className="h-4 w-4" />
              Hesabım
            </Link>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-9 gap-y-1 border-t border-neutral-200 px-3 py-3 text-[11px]">
          {links.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} className={active ? 'font-bold text-brand' : 'hover:text-brand'}>
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
