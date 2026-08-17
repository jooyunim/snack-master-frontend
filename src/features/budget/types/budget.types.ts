export type Budget = {
  currentMonthBudget: { year: number; month: number; amount: number };
  defaultMonthlyBudget: number;
};

export type UpdateBudgetInput = {
  amount: number;
  defaultMonthlyBudget: number;
};
