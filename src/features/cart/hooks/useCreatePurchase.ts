import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { createPurchase } from '../services/purchase.api';

export const useCreatePurchase = (selectedIds: number[]) => {
  const router = useRouter();

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
      router.push(`/cart/complete?id=${purchaseId}`);
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });
};
