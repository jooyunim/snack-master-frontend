import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchCartItems } from '../services/cart.api';
import { cartQueryKeys } from '../constants/query-keys';
import { Cart, CartItem } from '../schemas/cart';
import { useAuth } from '@/contexts/AuthContext';

export const usePatchQuantity = () => {
  const { user } = useAuth();
  const userId = user?.id ?? '';
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      patchCartItems(id, quantity),
    onMutate: async ({ id, quantity }: { id: number; quantity: number }) => {
      await queryClient.cancelQueries({ queryKey: cartQueryKeys.lists() });
      const previousData = queryClient.getQueryData<Cart>(
        cartQueryKeys.list(userId)
      );
      queryClient.setQueryData(
        cartQueryKeys.list(userId),
        (old: Cart | undefined) => {
          if (!old?.cartItem) return old;
          return {
            ...old,
            cartItem: old?.cartItem.map((item: CartItem) =>
              item.id === id ? { ...item, quantity: quantity } : item
            ),
          };
        }
      );
      return { previousData };
    },
    onError: (error, variables, context) => {
      alert(error.message);
      //수량 초기화 => 화면 수량이랑 서버 수량 달라짐 방지(서버에 맞추기)
      queryClient.setQueryData(
        cartQueryKeys.list(userId),
        context?.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
};
