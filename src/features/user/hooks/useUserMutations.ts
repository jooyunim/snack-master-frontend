import { useMutation } from '@tanstack/react-query';

import { updatePassword } from '../services/user.api';

export function useUserMutations() {
  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword,
  });

  return { updatePasswordMutation };
}
