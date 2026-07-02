import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const products = await getProducts(30);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <div className="mb-8">
        <p className="font-tag text-sm uppercase tracking-widest text-sage">
          Everything, priced honestly
        </p>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">
          Shop the full catalog
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 4} />
        ))}
      </div>
    </div>
  );
}
