import { sortByOption } from "../types/purchase-request-manage.type";

export const purchaseRequestManageKeys = {
  all: ['purchaseRequestManage'] as const,
  lists: () => [...purchaseRequestManageKeys.all, 'list'] as const,
  list: (sortBy?: sortByOption) => [...purchaseRequestManageKeys.lists(), sortBy] as const,
  details: () => [...purchaseRequestManageKeys.all, 'detail'] as const,
  detail: (id: number) => [...purchaseRequestManageKeys.details(), id] as const,
};
