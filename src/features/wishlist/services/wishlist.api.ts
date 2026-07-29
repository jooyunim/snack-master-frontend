import { apiFetch } from '@/lib/api';
import type { CursorPage, Product } from '@/features/product/types/product.types';

function buildQuery(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) query.set(key, String(value));
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

export function getWishlist(params: { cursor?: string; limit?: number } = {}) {
  const query = buildQuery({ cursor: params.cursor, limit: params.limit });
  return apiFetch<CursorPage<Product>>(`/wishlist${query}`);
}

export function addToWishlist(productId: number) {
  return apiFetch<null>('/wishlist', {
    method: 'POST',
    body: JSON.stringify({ productId }),
  });
}

export function removeFromWishlist(productId: number) {
  return apiFetch<null>(`/wishlist/${productId}`, { method: 'DELETE' });
}
