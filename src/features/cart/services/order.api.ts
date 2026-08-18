import { apiFetch } from '@/lib/api';
import type { Cart } from '../schemas/cart';

export type CreatePurchaseRequestResult = {
  id: number;
};

export const getCartOrderItems = async (
  selectedIds: number[]
): Promise<Cart> => {
  const query = `?cartItemIds=${selectedIds.join(',')}`;
  return apiFetch<Cart>(`/cart/order${query}`);
};

export const createPurchaseRequest = async (
  selectedIds: number[],
  requestMessage: string
) => {
  return apiFetch<CreatePurchaseRequestResult>('/cart/purchase-request', {
    method: 'POST',
    body: JSON.stringify({
      cartItemIds: selectedIds,
      requestMessage: requestMessage.trim(),
    }),
  });
};
