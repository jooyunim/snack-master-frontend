import { useQuery } from '@tanstack/react-query';

import { budgetKeys } from '../constants/query-keys';
import { getBudget } from '../services/budget.api';

export function useBudget() {
  return useQuery({
    queryKey: budgetKeys.current(),
    queryFn: getBudget,
  });
}
