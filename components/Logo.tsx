import Link from 'next/link';
import { Zap } from 'lucide-react';
import { SITE } from '@/lib/site';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="inline-flex items-center gap-1.5 text-xl font-extrabold tracking-tight">
      <Zap className="h-5 w-5 text-brand" fill="currentColor" />
      <span className={light ? 'text-white' : 'text-ink'}>{SITE.name}</span>
      <span className="text-brand">{SITE.nameAccent}</span>
    </Link>
  );
}
