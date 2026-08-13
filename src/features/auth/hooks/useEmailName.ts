import { useQuery } from '@tanstack/react-query';
import { getEmailNameApi } from '../services/auth.api';

export const useEmailName = ({ token }: { token: string | null }) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['getEmailName', token],
    queryFn: () => getEmailNameApi(token as string),
    enabled: !!token,
  });
  return { data, isPending, isError, error };
};
