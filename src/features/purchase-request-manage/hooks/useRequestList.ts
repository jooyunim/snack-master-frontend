import { useQuery } from '@tanstack/react-query';

import { getPurchaseRequestManageList } from '../services/purchase-request-manage.api';
import { sortByOption } from '../types/purchase-request-manage.type';
import { purchaseRequestManageKeys } from '../constants/query-keys';

export function useRequestList(sortBy: sortByOption) {
    return useQuery({
        queryKey: purchaseRequestManageKeys.list(sortBy),
        queryFn: () => getPurchaseRequestManageList(sortBy),
    });
}
