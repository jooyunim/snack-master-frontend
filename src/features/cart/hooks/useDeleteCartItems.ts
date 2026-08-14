import { useMutation, useQueryClient } from '@tanstack/react-query';
import { handleDeleteSelectedItems } from '../services/cart.api';
import { cartQueryKeys, orderItemsQueryKeys } from '../constants/query-keys';

export const useDeleteCartItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: number[]) => handleDeleteSelectedItems(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: orderItemsQueryKeys.all });
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });
};
