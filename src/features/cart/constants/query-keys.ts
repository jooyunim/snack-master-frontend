import { User } from '@/features/auth/types/auth.types';

export const cartQueryKeys = {
  all: ['cart'] as const,
  lists: () => [...cartQueryKeys.all, 'list'] as const,
  list: (userId: User['id']) => [...cartQueryKeys.lists(), userId] as const,
};

export const orderItemsQueryKeys = {
  all: ['orderItems'] as const,
  list: (ids: number[]) =>
    [...orderItemsQueryKeys.all, [...ids].sort((a, b) => a - b)] as const,
};

export const companyBalancePointQueryKeys = {
  all: ['companyBalancePoint'] as const,
};
