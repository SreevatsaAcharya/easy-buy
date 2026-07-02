export default function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 font-tag text-sm text-ink-soft">
      <span aria-hidden className="text-marigold-dark">
        ★
      </span>
      {rating.toFixed(1)}
    </span>
  );
}
