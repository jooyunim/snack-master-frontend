import { useInfiniteQuery } from '@tanstack/react-query';

import { productKeys } from '../constants/query-keys';
import { getProducts } from '../services/product.api';
import type {
  CursorPage,
  ListProductsParams,
  Product,
} from '../types/product.types';

export function useProducts(
  params: Omit<ListProductsParams, 'cursor'> = {},
  initialData?: CursorPage<Product>
) {
  return useInfiniteQuery({
    queryKey: productKeys.list(params),
    queryFn: ({ pageParam }) => getProducts({ ...params, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? (lastPage.nextCursor ?? undefined) : undefined,
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [undefined],
        }
      : undefined,
  });
}
