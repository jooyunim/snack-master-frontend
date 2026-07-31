import { useQuery } from '@tanstack/react-query';

import { userKeys } from '../constants/query-keys';
import { getMyProfile } from '../services/user.api';

export function useProfile() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: getMyProfile,
  });
}
