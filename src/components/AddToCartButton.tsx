"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

type AddToCartButtonProps = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity?: number;
  className?: string;
};

export default function AddToCartButton({
  id,
  title,
  price,
  thumbnail,
  quantity = 1,
  className = "",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = () => {
    addItem({ id, title, price, thumbnail }, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`font-tag text-sm font-bold uppercase tracking-wide rounded-md px-4 py-2 transition-colors ${
        justAdded
          ? "bg-sage text-paper-card"
          : "bg-ink text-paper-card hover:bg-coral"
      } ${className}`}
    >
      {justAdded ? "Added" : "Add to cart"}
    </button>
  );
}
