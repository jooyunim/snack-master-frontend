import { apiServerFetch } from '@/lib/api.server';

import type {
  CategoryWithChildren,
  CursorPage,
  ListProductsParams,
  Product,
} from '../types/product.types';

function buildQuery(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) query.set(key, String(value));
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

export function getProductsServer(params: ListProductsParams = {}) {
  const query = buildQuery({
    categoryId: params.categoryId,
    search: params.search,
    sort: params.sort,
    cursor: params.cursor,
    limit: params.limit,
  });
  return apiServerFetch<CursorPage<Product>>(`/products${query}`);
}

export function getCategoriesServer() {
  return apiServerFetch<CategoryWithChildren[]>('/categories');
}
