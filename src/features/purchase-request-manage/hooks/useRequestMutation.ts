import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchApprove, patchReject } from '../services/purchase-request-manage.api';
import { purchaseRequestManageKeys } from '../constants/query-keys';

export function useRequestMutations() {
    const queryClient = useQueryClient();

    const patchApproveMutation = useMutation({
        mutationFn: ({ id, resultMessage }: { id: number, resultMessage: string }) => patchApprove(id, resultMessage),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: purchaseRequestManageKeys.lists() });
            queryClient.invalidateQueries({ queryKey: purchaseRequestManageKeys.details() });
        },
    });

    const patchRejectMutation = useMutation({
        mutationFn: ({ id, resultMessage }: { id: number, resultMessage: string }) => patchReject(id, resultMessage),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: purchaseRequestManageKeys.lists() });
            queryClient.invalidateQueries({ queryKey: purchaseRequestManageKeys.details() });
        },
    });
    return { patchApproveMutation, patchRejectMutation }
}
