import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../services/purchase.api';
import { purchaseKeys, type OrderListParams } from '../constants/query-keys';

export function useOrders(params: OrderListParams) {
  return useQuery({
    queryKey: purchaseKeys.list(params),
    queryFn: () => getOrders(params),
    placeholderData: (prev) => prev,
  });
}
