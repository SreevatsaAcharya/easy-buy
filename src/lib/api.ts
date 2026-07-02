import type { Product, ProductListResponse } from "@/lib/types";

const API_BASE = "https://dummyjson.com";

export async function getProducts(limit = 30): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products?limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data: ProductListResponse = await res.json();
  return data.products;
}

export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
