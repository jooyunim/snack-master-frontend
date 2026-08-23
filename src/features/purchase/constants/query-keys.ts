import type { OrderSort } from '../types/purchase.types';

export type OrderListParams = {
  page: number;
  pageSize: number;
  sort: OrderSort;
};

export const purchaseKeys = {
  all: ['orders'] as const,
  lists: () => [...purchaseKeys.all, 'list'] as const,
  list: (params: OrderListParams) => [...purchaseKeys.lists(), params] as const,
  details: () => [...purchaseKeys.all, 'detail'] as const,
  detail: (id: number) => [...purchaseKeys.details(), id] as const,
};

export const dashboardKeys = {
  all: ['dashboard'] as const,
  summary: () => [...dashboardKeys.all, 'summary'] as const,
};
