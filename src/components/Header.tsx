"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-10 bg-ink text-paper-card">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight"
        >
          Easy<span className="text-marigold">Buy</span>
        </Link>

        <Link
          href="/cart"
          className="group flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition-colors hover:border-marigold"
          aria-label={`Cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
        >
          <svg
            aria-hidden
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-marigold transition-transform group-hover:scale-110"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className="font-tag text-sm font-bold">{totalItems}</span>
        </Link>
      </div>
    </header>
  );
}
