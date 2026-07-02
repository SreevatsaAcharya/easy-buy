import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import PriceTag from "@/components/PriceTag";
import StarRating from "@/components/StarRating";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const hasDiscount = product.discountPercentage > 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-paper-card shadow-[2px_3px_0_rgba(22,33,58,0.1)] transition-transform hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square bg-white">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4"
            priority={priority}
          />
          {hasDiscount && (
            <span className="absolute left-2 top-2 rounded-full bg-coral px-2 py-1 font-tag text-xs font-bold text-paper-card">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 px-4 pt-3">
          <h2 className="line-clamp-2 font-display text-base font-semibold leading-snug">
            {product.title}
          </h2>
          <StarRating rating={product.rating} />
        </div>
      </Link>
      <div className="flex flex-col items-start gap-2 px-4 pb-4 pt-3">
        <PriceTag price={product.price} sale={hasDiscount} />
        <AddToCartButton
          id={product.id}
          title={product.title}
          price={product.price}
          thumbnail={product.thumbnail}
          className="w-full"
        />
      </div>
    </div>
  );
}
