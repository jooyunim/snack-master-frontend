import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { instantPurchase } from '../services/cart.api';
import { cartQueryKeys } from '../constants/query-keys';
import { useAuth } from '@/contexts/AuthContext';

export const useInstantPurchase = () => {
  const { user } = useAuth();
  const userId = user?.id ?? '';
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (cartItemIds: number[]) => instantPurchase(cartItemIds),
    onSuccess: (response) => {
      const purchaseId = response.id;
      if (!purchaseId) {
        alert('구매에 실패하였습니다.');
        router.push('/cart');
        return;
      }
      queryClient.removeQueries({ queryKey: cartQueryKeys.list(userId) });
      router.push(`/cart/complete?id=${purchaseId}`);
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });
};
