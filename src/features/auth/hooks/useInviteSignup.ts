import { useMutation } from '@tanstack/react-query';
import { inviteSignupApi } from '../services/auth.api';
import { InviteSignupFormValues } from '../schemas/auth';

export const useInviteSignup = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) => {
  const inviteSignupMutation = useMutation({
    mutationFn: ({
      token,
      password,
      passwordConfirm,
    }: InviteSignupFormValues & { token: string }) =>
      inviteSignupApi(token, password, passwordConfirm),
    onSuccess,
    onError,
  });
  return { inviteSignupMutation };
};
