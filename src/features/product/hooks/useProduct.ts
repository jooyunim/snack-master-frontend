import { useQuery } from '@tanstack/react-query';

import { productKeys } from '../constants/query-keys';
import { getProductById } from '../services/product.api';

export function useProduct(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: Number.isFinite(id),
  });
}
