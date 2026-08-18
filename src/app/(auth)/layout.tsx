'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthChecked, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecked && isLoggedIn) {
      router.replace('/products');
    }
  }, [isAuthChecked, isLoggedIn, router]);

  if (!isAuthChecked || isLoggedIn) {
    return <main>Loading...</main>;
  }

  return <>{children}</>;
}
