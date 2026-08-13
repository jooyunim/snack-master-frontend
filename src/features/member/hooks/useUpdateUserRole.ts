import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Member, MembersResponse } from '../types/members.type';
import { updateMemberRole } from '../services/member.api';

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  const {
    mutate: updateMemberRoleMutation,
    isPending: isUpdateMemberRolePending,
  } = useMutation({
    mutationFn: ({ id, role }: { id: string; role: Member['role'] }) =>
      updateMemberRole(id, role),
    onSuccess: (_data, { id, role }) => {
      queryClient.setQueriesData<MembersResponse>(
        { queryKey: ['members'] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            members: old.members.map((member) =>
              member.id === id ? { ...member, role } : member
            ),
          };
        }
      );
    },
  });

  return { updateMemberRoleMutation, isUpdateMemberRolePending };
};
