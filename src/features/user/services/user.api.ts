import { apiFetch } from '@/lib/api';
import type { Profile, UpdatePasswordInput } from '../types/user.types';

export function getMyProfile() {
  return apiFetch<Profile>('/users/me');
}

export function updatePassword(input: UpdatePasswordInput) {
  return apiFetch<null>('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(input),
  });
}
