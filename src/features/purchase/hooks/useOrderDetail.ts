import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../services/purchase.api';
import { purchaseKeys } from '../constants/query-keys';

export function useOrderDetail(orderId: number, enabled: boolean) {
  return useQuery({
    queryKey: purchaseKeys.detail(orderId),
    queryFn: () => getOrderById(orderId),
    enabled,
    staleTime: 5 * 60 * 1000, // 같은 id 재진입 시 캐시
  });
}
