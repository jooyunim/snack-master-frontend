import { useQuery } from '@tanstack/react-query';
import { getCartItems } from '../services/cart.api';
import { cartQueryKeys } from '../constants/query-keys';
import { useAuth } from '@/contexts/AuthContext';

export const useCarts = () => {
  const { isAuthChecked, isLoggedIn, user } = useAuth();
  const userId = user?.id ?? ''; //enabled=false일 때 타입만 맞추기, enabled가 true일 때 userId로 요청
  const enabled = isAuthChecked && isLoggedIn && !!user;

  return useQuery({
    queryKey: cartQueryKeys.list(userId),
    queryFn: () => getCartItems(),
    enabled, //enabled가 true일 때만 쿼리 실행
    staleTime: Infinity, //직접 호출 또는 쿼리키 바뀌지 않으면 데이터는 계속 fresh한 상태로 유지
  });
};
