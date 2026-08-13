import { useMutation } from '@tanstack/react-query';
import { AdminSignupFormValues } from '../schemas/auth';
import { adminSignupApi } from '../services/auth.api';

export const useSignup = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: Error) => void;
}) => {
  const signupMutation = useMutation({
    mutationFn: ({
      email,
      name,
      password,
      passwordConfirm,
      companyName,
      businessNumber,
    }: AdminSignupFormValues) =>
      adminSignupApi(
        email,
        name,
        password,
        passwordConfirm,
        companyName,
        businessNumber
      ),
    onSuccess,
    onError,
  });
  return { signupMutation };
};
