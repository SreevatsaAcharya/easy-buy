"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import PriceTag from "@/components/PriceTag";

export default function CartPage() {
  const { items, removeItem, setQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-bold">
          Your cart is empty
        </h1>
        <p className="text-ink-soft">
          Go find something worth tagging.
        </p>
        <Link
          href="/"
          className="rounded-md bg-ink px-6 py-3 font-tag text-sm font-bold uppercase tracking-wide text-paper-card transition-colors hover:bg-coral"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="mb-6 font-display text-3xl font-bold">Your cart</h1>

      <div className="rounded-xl bg-paper-card p-5 shadow-[2px_3px_0_rgba(22,33,58,0.1)]">
        <ul>
          {items.map((item, index) => (
            <li key={item.id}>
              {index > 0 && <hr className="receipt-divider my-4" />}
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-white">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <Link
                    href={`/products/${item.id}`}
                    className="font-display font-semibold leading-snug hover:text-coral"
                  >
                    {item.title}
                  </Link>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-md border border-line">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${item.title}`}
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 font-tag hover:text-coral"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-tag text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${item.title}`}
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 font-tag hover:text-coral"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="font-tag text-xs uppercase tracking-wide text-ink-soft underline hover:text-coral"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <PriceTag price={item.price * item.quantity} onPaper />
              </div>
            </li>
          ))}
        </ul>

        <hr className="receipt-divider my-5" />

        <div className="flex items-center justify-between font-tag">
          <span className="uppercase tracking-wide text-ink-soft">
            Items ({totalItems})
          </span>
          <span className="text-lg font-bold">Total ${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
