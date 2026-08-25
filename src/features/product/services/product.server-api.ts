import { cookies } from 'next/headers';

import type {
  CategoryWithChildren,
  CursorPage,
  ListProductsParams,
  Product,
} from '../types/product.types';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000';

function buildQuery(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) query.set(key, String(value));
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

async function serverFetch<T>(path: string): Promise<T> {
  const cookieHeader = (await cookies()).toString();
  const response = await fetch(`${API_BASE}${path}`, {
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
    cache: 'no-store',
  });

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.message ?? '서버에서 데이터를 불러오지 못했습니다.');
  }

  return body.data as T;
}

export function getProductsServer(params: ListProductsParams = {}) {
  const query = buildQuery({
    categoryId: params.categoryId,
    search: params.search,
    sort: params.sort,
    cursor: params.cursor,
    limit: params.limit,
  });
  return serverFetch<CursorPage<Product>>(`/products${query}`);
}

export function getCategoriesServer() {
  return serverFetch<CategoryWithChildren[]>('/categories');
}
