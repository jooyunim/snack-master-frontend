import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddToCart } from '../schemas/cart';
import { addToCart } from '../services/cart.api';
import { useAuth } from '@/contexts/AuthContext';
import { cartQueryKeys } from '../constants/query-keys';

export const useAddCartItem = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userId = user?.id ?? '';

  return useMutation({
    mutationFn: (data: AddToCart) => addToCart(data.productId, data.quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartQueryKeys.list(userId),
      });
    },
  });
};
