import type { Product } from '@/lib/products';

export function ProductArt({ product, small = false }: { product: Product; small?: boolean }) {
  const { art, inStock } = product;
  return (
    <div className="relative grid aspect-square place-items-center rounded-lg bg-neutral-50">
      <div
        className={`flex aspect-[3/4.1] flex-col items-center justify-between rounded-lg py-3 text-center text-white shadow-sm ${small ? 'w-[70%]' : 'w-[60%]'} ${inStock ? '' : 'opacity-40 grayscale'}`}
        style={{ background: `linear-gradient(160deg, ${art.from}, ${art.to})` }}
      >
        <span className="h-2 w-8 rounded-full bg-white/90" />
        <div className="px-2">
          <div className="text-[9px] font-semibold opacity-90">{art.label}</div>
          <div className="mt-3 text-[13px] font-extrabold leading-tight">{art.title}</div>
          <div className="mt-1 text-[7px] opacity-80">{art.subtitle}</div>
        </div>
        <div className="text-[11px] font-extrabold">{art.tag}</div>
      </div>
      {!inStock && <span className="absolute rounded bg-neutral-700 px-2 py-1 text-[9px] font-semibold text-white">Stokta Yok</span>}
    </div>
  );
}
