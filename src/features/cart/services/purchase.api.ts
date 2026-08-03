import { apiFetch } from '@/lib/api';

export type BalancePoint = {
  balancePointAmount: number;
};

export type CreatePurchaseResult = {
  id: number;
};

export const getCompanyBalancePoint = async () => {
  return apiFetch<BalancePoint>('/point/balance');
};

export const createPurchase = async (
  selectedIds: number[],
  requestPointAmount: number
) => {
  return apiFetch<CreatePurchaseResult>('/cart/purchase', {
    method: 'POST',
    body: JSON.stringify({
      cartItemIds: selectedIds,
      requestPointAmount,
    }),
  });
};
