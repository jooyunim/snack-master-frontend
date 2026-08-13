import { useQuery } from '@tanstack/react-query';

import { purchaseRequestKeys } from '../constants/query-keys';
import { getMyPurchaseRequest } from '../services/purchase-request.api';

export function useMyPurchaseRequest(id: number) {
  return useQuery({
    queryKey: purchaseRequestKeys.detail(id),
    queryFn: () => getMyPurchaseRequest(id),
    enabled: Number.isInteger(id) && id > 0,
  });
}
