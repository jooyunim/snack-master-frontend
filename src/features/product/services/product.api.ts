import { apiFetch } from '@/lib/api';
import type {
  CategoryWithChildren,
  CreateProductInput,
  CursorPage,
  ImageUploadUrlResponse,
  ListProductsParams,
  Product,
  ProductDetail,
  UpdateProductInput,
} from '../types/product.types';

function buildQuery(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) query.set(key, String(value));
  });
  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

export function getProducts(params: ListProductsParams = {}) {
  const query = buildQuery({
    categoryId: params.categoryId,
    search: params.search,
    sort: params.sort,
    cursor: params.cursor,
    limit: params.limit,
  });
  return apiFetch<CursorPage<Product>>(`/products${query}`);
}

export function getMyProducts(params: { cursor?: string; limit?: number } = {}) {
  const query = buildQuery({ cursor: params.cursor, limit: params.limit });
  return apiFetch<CursorPage<Product>>(`/products/mine${query}`);
}

export function getProductById(id: number) {
  return apiFetch<ProductDetail>(`/products/${id}`);
}

export function getCategories() {
  return apiFetch<CategoryWithChildren[]>('/categories');
}

export function getProductImageUploadUrl(filename: string) {
  return apiFetch<ImageUploadUrlResponse>('/products/image-upload-url', {
    method: 'POST',
    body: JSON.stringify({ filename }),
  });
}

export function createProduct(input: CreateProductInput) {
  return apiFetch<Product>('/products', {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export function updateProduct(id: number, input: UpdateProductInput) {
  return apiFetch<Product>(`/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}

export function deleteProduct(id: number) {
  return apiFetch<null>(`/products/${id}`, { method: 'DELETE' });
}

/** presigned URL로 S3에 이미지 파일을 직접 업로드 */
export async function uploadProductImage(uploadUrl: string, file: File) {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  if (!response.ok) {
    throw new Error('이미지 업로드에 실패했습니다.');
  }
}
