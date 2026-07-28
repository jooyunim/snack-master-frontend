import { useInfiniteQuery } from '@tanstack/react-query';

import { wishlistKeys } from '../constants/query-keys';
import { getWishlist } from '../services/wishlist.api';

/** "더보기" 방식 내 찜 목록 (cursor 기반) */
export function useWishlist() {
  return useInfiniteQuery({
    queryKey: wishlistKeys.lists(),
    queryFn: ({ pageParam }) => getWishlist({ cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
  });
}
