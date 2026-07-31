import type { Role } from '@/features/auth/types/auth.types';

export type Profile = {
  id: string;
  name: string;
  email: string;
  role: Role;
  companyName: string;
};

export type UpdatePasswordInput = {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};
