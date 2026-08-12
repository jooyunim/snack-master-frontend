import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPurchaseRequest } from '../services/order.api';
import { useRouter } from 'next/navigation';
import { cartQueryKeys } from '../constants/query-keys';
import { useAuth } from '@/contexts/AuthContext';

export const useCreatePurchaseRequest = (
  selectedIds: number[],
  requestMessage: string
) => {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id ?? '';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createPurchaseRequest(selectedIds, requestMessage),
    // POST /cart/purchase-request 응답의 id를 쿼리로 전달
    // 완료 페이지에서 GET /purchase-requests/mine/:id 로 실제 요청 내역 조회하도록
    onSuccess: (response) => {
      const purchaseRequestId = response.id;
      if (!purchaseRequestId) {
        alert('구매 요청에 실패하였습니다.');
        router.push('/cart');
        return;
      }
      queryClient.removeQueries({ queryKey: cartQueryKeys.list(userId) });
      router.push(`/cart/complete?id=${purchaseRequestId}`);
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });
};
