import { useQuery } from '@tanstack/react-query';
import { companyBalancePointQueryKeys } from '../constants/query-keys';
import { getCompanyBalancePoint } from '../services/purchase.api';
import { useAuth } from '@/contexts/AuthContext';

export const usePoints = () => {
  const { user, isAuthChecked, isLoggedIn } = useAuth();

  const fetchPoints = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

  return useQuery({
    queryKey: companyBalancePointQueryKeys.all,
    queryFn: () => getCompanyBalancePoint(),
    enabled: isAuthChecked && isLoggedIn && fetchPoints,
  });
};
