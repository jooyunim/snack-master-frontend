import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productKeys } from '@/features/product/constants/query-keys';
import { wishlistKeys } from '../constants/query-keys';
import { addToWishlist, removeFromWishlist } from '../services/wishlist.api';

export function useWishlistMutations() {
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: wishlistKeys.lists() });
    queryClient.invalidateQueries({ queryKey: productKeys.lists() });
  };

  /** 현재 찜 상태(isWished)의 반대로 뒤집는다 — 하트 버튼 토글 UX용 */
  const toggleMutation = useMutation({
    mutationFn: ({
      productId,
      isWished,
    }: {
      productId: number;
      isWished: boolean;
    }) => (isWished ? removeFromWishlist(productId) : addToWishlist(productId)),
    onSuccess: invalidate,
  });

  return { toggleMutation };
}
