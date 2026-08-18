import { useQuery } from '@tanstack/react-query';
import { orderItemsQueryKeys } from '../constants/query-keys';
import { getCartOrderItems } from '../services/order.api';

export const useOrderItems = (selectedIds: number[]) => {
  return useQuery({
    queryKey: orderItemsQueryKeys.list(selectedIds),
    queryFn: () => getCartOrderItems(selectedIds),
    enabled: selectedIds.length > 0,
  });
};
