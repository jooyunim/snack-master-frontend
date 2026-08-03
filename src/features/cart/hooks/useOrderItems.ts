import { useQuery } from '@tanstack/react-query';
import { cartQueryKeys } from '../constants/query-keys';
import { getCartOrderItems } from '../services/order.api';

export const useOrderItems = (selectedIds: number[]) => {
  return useQuery({
    queryKey: cartQueryKeys.orderItems(selectedIds),
    queryFn: () => getCartOrderItems(selectedIds),
    enabled: selectedIds.length > 0,
  });
};
