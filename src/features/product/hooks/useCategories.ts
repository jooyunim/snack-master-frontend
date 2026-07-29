import { useQuery } from '@tanstack/react-query';

import { categoryKeys } from '../constants/query-keys';
import { getCategories } from '../services/product.api';

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000, // 카테고리는 자주 안 바뀌므로 5분 캐시
  });
}
