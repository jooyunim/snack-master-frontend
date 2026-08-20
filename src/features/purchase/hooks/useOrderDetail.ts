import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '../services/purchase.api';
import { purchaseKeys } from '../constants/query-keys';

export function useOrderDetail(orderId: number, enabled = true) {
  const canFetch = Number.isInteger(orderId) && orderId >= 1;
  return useQuery({
    queryKey: purchaseKeys.detail(orderId),
    queryFn: () => getOrderById(orderId),

    enabled: enabled && canFetch,
    staleTime: 5 * 60 * 1000,
  });
}
