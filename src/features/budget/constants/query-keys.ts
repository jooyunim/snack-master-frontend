export const budgetKeys = {
  all: ['budgets'] as const,
  current: () => [...budgetKeys.all, 'current'] as const,
};
