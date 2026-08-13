import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createPurchase } from '../services/purchase.api';
import { cartQueryKeys } from '../constants/query-keys';
import { useAuth } from '@/contexts/AuthContext';

export const useCreatePurchase = (selectedIds: number[]) => {
  const { user } = useAuth();
  const userId = user?.id ?? '';
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestPointAmount: number) =>
      createPurchase(selectedIds, requestPointAmount),
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
