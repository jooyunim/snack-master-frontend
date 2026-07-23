import type { ListProductsParams } from '../types/product.types';

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (params: Omit<ListProductsParams, 'cursor'>) =>
    [...productKeys.lists(), params] as const,
  myLists: () => [...productKeys.all, 'my', 'list'] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
};

export const categoryKeys = {
  all: ['categories'] as const,
  list: () => [...categoryKeys.all, 'list'] as const,
};
