import { useMutation, useQueryClient } from '@tanstack/react-query';

import { purchaseRequestKeys } from '../constants/query-keys';
import { cancelMyPurchaseRequest } from '../services/purchase-request.api';

export function useCancelPurchaseRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelMyPurchaseRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: purchaseRequestKeys.myLists(),
      });
    },
  });
}
