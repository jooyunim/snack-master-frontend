'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { refundOrder } from '../services/purchase.api';
import { dashboardKeys, purchaseKeys } from '../constants/query-keys';

export function useRefundOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, refundReason }: { id: number; refundReason: string }) =>
      refundOrder(id, refundReason),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: purchaseKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: purchaseKeys.lists() });
      queryClient.invalidateQueries({ queryKey: dashboardKeys.summary() });
    },
  });
}
