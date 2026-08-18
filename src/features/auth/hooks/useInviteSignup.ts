import { useMutation } from '@tanstack/react-query';
import { inviteSignupApi } from '../services/auth.api';

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
    }: {
      token: string;
      password: string;
      passwordConfirm: string;
    }) => inviteSignupApi(token, password, passwordConfirm),
    onSuccess,
    onError,
  });
  return { inviteSignupMutation };
};
