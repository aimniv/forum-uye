import { Star, StarHalf } from 'lucide-react';

export function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) =>
        rating >= i ? (
          <Star key={i} className="h-2.5 w-2.5 text-amber-400" fill="currentColor" />
        ) : rating >= i - 0.5 ? (
          <StarHalf key={i} className="h-2.5 w-2.5 text-amber-400" fill="currentColor" />
        ) : (
          <Star key={i} className="h-2.5 w-2.5 text-neutral-300" />
        ),
      )}
      <span className="ml-1 text-[8px] text-neutral-400">({reviews})</span>
    </div>
  );
}
