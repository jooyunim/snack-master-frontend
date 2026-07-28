import { useInfiniteQuery } from '@tanstack/react-query';

import { productKeys } from '../constants/query-keys';
import { getMyProducts } from '../services/product.api';
import type { ProductSort } from '../types/product.types';

/** 내 등록 내역 "더보기" 목록 */
export function useMyProducts(sort: ProductSort = 'recent', limit?: number) {
  return useInfiniteQuery({
    queryKey: productKeys.myList(sort),
    queryFn: ({ pageParam }) => getMyProducts({ sort, cursor: pageParam, limit }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
  });
}
