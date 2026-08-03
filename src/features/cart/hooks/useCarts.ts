import { useQuery } from '@tanstack/react-query';
import { getCartItems } from '../services/cart.api';
import { cartQueryKeys } from '../constants/query-key';

export const useCarts = () => {
  return useQuery({
    queryKey: cartQueryKeys.list(),
    queryFn: () => getCartItems(),
  });
};
