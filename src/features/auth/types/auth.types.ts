export type User = {
  email: string;
  name: string;
  id: string;
  companyId: number;
  role: Role;
};

export type Role = 'USER' | 'ADMIN' | 'SUPER_ADMIN';
