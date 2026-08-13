import { apiFetch } from '@/lib/api';
import { Cart } from '../schemas/cart';

export const getCartItems = async (): Promise<Cart> => {
  const res = await apiFetch<Cart>('/cart');

  return res;
};

export const handleDeleteSelectedItems = async (selectedIds: number[]) => {
  const res = await apiFetch<null>('/cart', {
    method: 'DELETE',
    body: JSON.stringify({
      cartItemIds: selectedIds,
    }),
  });

  return res;
};

export const patchCartItems = async (id: number, quantity: number) => {
  const res = await apiFetch<null>('/cart', {
    method: 'PATCH',
    body: JSON.stringify({
      cartItemIds: [id],
      quantity: quantity,
    }),
  });

  return res;
};

export type InstantPurchaseResult = {
  id: number;
};

export const instantPurchase = async (cartItemIds: number[]) => {
  return apiFetch<InstantPurchaseResult>('/cart/instant', {
    method: 'POST',
    body: JSON.stringify({ cartItemIds }),
  });
};
