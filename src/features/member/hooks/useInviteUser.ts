import { useMutation, useQueryClient } from '@tanstack/react-query';
import { inviteUsers } from '../services/member.api';
import { InviteUserParams } from '../types/members.type';

export const useInviteUser = () => {
  const queryClient = useQueryClient();

  const { mutate: inviteUsersMutation, isPending: isInviteUsersPending } =
    useMutation({
      mutationFn: ({ email, name, role }: InviteUserParams) =>
        inviteUsers(email, name, role),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['members'] });
      },
    });

  return { inviteUsersMutation, isInviteUsersPending };
};
