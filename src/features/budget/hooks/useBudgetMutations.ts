import { useMutation, useQueryClient } from '@tanstack/react-query';

import { budgetKeys } from '../constants/query-keys';
import { updateBudget } from '../services/budget.api';

export function useBudgetMutations() {
  const queryClient = useQueryClient();

  const updateBudgetMutation = useMutation({
    mutationFn: updateBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: budgetKeys.current() });
    },
  });

  return { updateBudgetMutation };
}
