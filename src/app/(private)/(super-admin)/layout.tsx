'use client';

import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';

export default function SuperAdminLayout({
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
  if (user.role !== 'SUPER_ADMIN') {
    return redirect('/unauthorized');
  }
  return <>{children}</>;
}
