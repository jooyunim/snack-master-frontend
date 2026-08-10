import { useQuery } from '@tanstack/react-query';

import { purchaseRequestManageKeys } from '../constants/query-keys';
import { getPurchaseRequestManageDetail } from '../services/purchase-request-manage.api';
import type { purchaseRequestManageDetail } from '../types/purchase-request-manage.type';

export function useRequestDetail(id: number | null) {
  return useQuery<purchaseRequestManageDetail>({
    queryKey: purchaseRequestManageKeys.detail(id ?? 0),
    queryFn: () => getPurchaseRequestManageDetail(id!),
    enabled: id !== null,
  });
}
