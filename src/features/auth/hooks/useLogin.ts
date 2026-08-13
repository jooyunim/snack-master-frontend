import { useMutation } from '@tanstack/react-query';
import { LoginFormValues } from '../schemas/auth';
import { useAuth } from '@/contexts/AuthContext';

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: (data: LoginFormValues) => login(data),
    onSuccess,
    onError,
  });
  return { loginMutation };
};
