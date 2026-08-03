import { useQuery } from '@tanstack/react-query';
import { cartQueryKeys } from '../constants/query-key';
import { getCompanyBalancePoint } from '../services/purchase.api';

export const usePoints = () => {
  return useQuery({
    queryKey: cartQueryKeys.companyBalancePoint(),
    queryFn: () => getCompanyBalancePoint(),
  });
};
