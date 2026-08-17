import { apiFetch } from '@/lib/api';
import type { Budget, UpdateBudgetInput } from '../types/budget.types';

export function getBudget() {
  return apiFetch<Budget>('/budgets');
}

export function updateBudget(input: UpdateBudgetInput) {
  return apiFetch<null>('/budgets', {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}
