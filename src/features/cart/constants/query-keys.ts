import { User } from '@/features/auth/types/auth.types';

export const cartQueryKeys = {
  all: ['cart'] as const,
  lists: () => [...cartQueryKeys.all, 'list'] as const,
  list: (userId: User['id']) => [...cartQueryKeys.lists(), userId] as const,
  orderItems: (ids: number[]) =>
    [...cartQueryKeys.all, 'orderItems', ids] as const,
  companyBalancePoint: () =>
    [...cartQueryKeys.all, 'companyBalancePoint'] as const,
};
