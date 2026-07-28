'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Role } from '@/features/auth/types/auth.types';
import { redirect } from 'next/navigation';

const allowedRoles: Role[] = ['ADMIN', 'SUPER_ADMIN'];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthChecked, user } = useAuth();

  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return redirect('/login');
  }

  if (!allowedRoles.includes(user.role)) {
    return redirect('/products');
  }

  return <>{children}</>;
}
