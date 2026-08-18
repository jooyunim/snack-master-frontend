import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { MembersResponse } from '../types/members.type';
import { getMembers } from '../services/member.api';

export const useUsers = (
  debouncedSearch: string,
  page: number,
  pageSize: number
) => {
  return useQuery<MembersResponse>({
    queryKey: ['members', debouncedSearch, page, pageSize],
    queryFn: () => getMembers(debouncedSearch, page, pageSize),
    placeholderData: keepPreviousData,
  });
};
