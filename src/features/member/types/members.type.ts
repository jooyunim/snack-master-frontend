export type MemberRole = 'USER' | 'ADMIN';

export type Member = {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: MemberRole;
};

export type MembersResponse = {
  members: Member[];
  total: number;
};

export type InviteUserParams = {
  email: string;
  name: string;
  role: Member['role'];
};

export type RoleOption = {
  value: Member['role'];
  label: string;
};
