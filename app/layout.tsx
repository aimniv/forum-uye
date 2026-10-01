import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: { default: `${SITE.tagline} | ${SITE.name} ${SITE.nameAccent}`, template: `%s | ${SITE.name} ${SITE.nameAccent}` },
  description: SITE.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <CartProvider>
          <Header />
          <main className="border-t border-neutral-200">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
