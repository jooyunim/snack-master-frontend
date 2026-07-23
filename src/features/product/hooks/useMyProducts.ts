import { useInfiniteQuery } from '@tanstack/react-query';

import { productKeys } from '../constants/query-keys';
import { getMyProducts } from '../services/product.api';

/** 내 등록 내역 "더보기" 목록 */
export function useMyProducts(limit?: number) {
  return useInfiniteQuery({
    queryKey: productKeys.myLists(),
    queryFn: ({ pageParam }) => getMyProducts({ cursor: pageParam, limit }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
  });
}
