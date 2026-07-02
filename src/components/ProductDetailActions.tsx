"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type ProductDetailActionsProps = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  stock: number;
};

export default function ProductDetailActions({
  id,
  title,
  price,
  thumbnail,
  stock,
}: ProductDetailActionsProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    addItem({ id, title, price, thumbnail }, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center rounded-md border border-line">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-2 font-tag text-lg hover:text-coral"
        >
          −
        </button>
        <span className="w-8 text-center font-tag font-bold">{quantity}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
          className="px-3 py-2 font-tag text-lg hover:text-coral"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className={`font-tag text-sm font-bold uppercase tracking-wide rounded-md px-6 py-3 transition-colors ${
          justAdded
            ? "bg-sage text-paper-card"
            : "bg-ink text-paper-card hover:bg-coral"
        }`}
      >
        {justAdded ? "Added to cart" : "Add to cart"}
      </button>

      <span className="font-tag text-xs uppercase tracking-wide text-ink-soft">
        {stock > 0 ? `${stock} in stock` : "Out of stock"}
      </span>
    </div>
  );
}
