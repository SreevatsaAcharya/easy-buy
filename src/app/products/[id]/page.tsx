import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import PriceTag from "@/components/PriceTag";
import StarRating from "@/components/StarRating";
import ProductDetailActions from "@/components/ProductDetailActions";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  const hasDiscount = product.discountPercentage > 0;
  const originalPrice = hasDiscount
    ? product.price / (1 - product.discountPercentage / 100)
    : null;

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 font-tag text-sm text-ink-soft hover:text-coral"
      >
        ← Back to shop
      </Link>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-white">
          <Image
            src={product.images?.[0] ?? product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-contain p-6"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-tag text-xs uppercase tracking-widest text-sage">
            {product.category}
            {product.brand ? ` · ${product.brand}` : ""}
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight">
            {product.title}
          </h1>
          <StarRating rating={product.rating} />

          <div className="flex items-center gap-3">
            <PriceTag price={product.price} sale={hasDiscount} size="lg" />
            {originalPrice && (
              <span className="font-tag text-ink-soft line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            {hasDiscount && (
              <span className="rounded-full bg-coral px-2 py-1 font-tag text-xs font-bold text-paper-card">
                -{Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          <p className="leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <hr className="receipt-divider my-2" />

          <ProductDetailActions
            id={product.id}
            title={product.title}
            price={product.price}
            thumbnail={product.thumbnail}
            stock={product.stock}
          />
        </div>
      </div>
    </div>
  );
}
