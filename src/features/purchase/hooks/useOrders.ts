import { useQuery } from '@tanstack/react-query';
import { getOrders } from '../services/purchase.api';
import type { OrderSort } from '../types/purchase.types';
import { purchaseKeys } from '../constants/query-keys';

export function useOrders(page: number, pageSize: number, sort: OrderSort) {
  return useQuery({
    queryKey: purchaseKeys.list(page, pageSize, sort),
    queryFn: () => getOrders({ page, pageSize, sort }),
    placeholderData: (prev) => prev, // 이전 페이지 잠깐 유지(선택)
  });
}
