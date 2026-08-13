import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMember } from '../services/member.api';

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteMemberMutation, isPending: isDeletePending } =
    useMutation({
      mutationFn: (id: string) => deleteMember(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['members'] });
      },
    });

  return { deleteMemberMutation, isDeletePending };
};
