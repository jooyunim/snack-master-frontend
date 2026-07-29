import { useInfiniteQuery } from '@tanstack/react-query';

import { productKeys } from '../constants/query-keys';
import { getProducts } from '../services/product.api';
import type { ListProductsParams } from '../types/product.types';

/** "더보기" 방식 상품 목록 (cursor 기반) */
export function useProducts(params: Omit<ListProductsParams, 'cursor'> = {}) {
  return useInfiniteQuery({
    queryKey: productKeys.list(params),
    queryFn: ({ pageParam }) => getProducts({ ...params, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
  });
}
