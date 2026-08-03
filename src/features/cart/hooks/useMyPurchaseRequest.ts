import { useQuery } from '@tanstack/react-query';
import { purchaseRequestKeys } from '@/features/purchase-request/constants/query-keys';
import { getMyPurchaseRequest } from '@/features/purchase-request/services/purchase-request.api';

export const useMyPurchaseRequest = (id: number, enabled = true) => {
  return useQuery({
    queryKey: [...purchaseRequestKeys.details(), 'my', id],
    queryFn: () => getMyPurchaseRequest(id),
    enabled: enabled && Number.isInteger(id) && id > 0,
  });
};
