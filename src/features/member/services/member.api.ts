import { apiFetch } from '@/lib/api';
import { Member, MembersResponse } from '../types/members.type';

export const inviteUsers = async (
  email: string,
  name: string,
  role: Member['role']
) => {
  return await apiFetch<null>(`/members/invite`, {
    method: 'POST',
    body: JSON.stringify({ email, name, role }),
  });
};

export const updateMemberRole = async (id: string, role: Member['role']) => {
  return await apiFetch<null>(`/members/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });
};

export const deleteMember = async (id: string) => {
  return await apiFetch<null>(`/members/${id}/delete`, {
    method: 'PATCH',
  });
};

export const getMembers = async (
  search: string,
  page: number,
  pageSize: number
): Promise<MembersResponse> => {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });
  if (search) params.set('search', search);
  return await apiFetch<MembersResponse>(`/members?${params.toString()}`);
};
