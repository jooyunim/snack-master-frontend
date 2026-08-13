import { useQuery } from '@tanstack/react-query';

import { purchaseRequestKeys } from '../constants/query-keys';
import { getMyPurchaseRequests } from '../services/purchase-request.api';

export function useMyPurchaseRequests(
  page: number,
  pageSize: number,
  sortBy: string
) {
  return useQuery({
    queryKey: purchaseRequestKeys.myList(page, pageSize, sortBy),
    queryFn: () => getMyPurchaseRequests(page, pageSize, sortBy),
  });
}
