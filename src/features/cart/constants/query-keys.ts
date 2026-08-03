export const cartQueryKeys = {
  all: ['cart'] as const,
  lists: () => [...cartQueryKeys.all, 'list'] as const,
  list: () => [...cartQueryKeys.lists()] as const,
  orderItems: (ids: number[]) =>
    [...cartQueryKeys.all, 'orderItems', ids] as const,
  companyBalancePoint: () =>
    [...cartQueryKeys.all, 'companyBalancePoint'] as const,
};
