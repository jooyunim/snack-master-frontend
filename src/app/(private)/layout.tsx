'use client';

import Gnb from '@/components/Gnb';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthChecked, isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthChecked && (!isLoggedIn || !user)) {
      router.replace('/login');
    }
  }, [isAuthChecked, isLoggedIn, user, router]);

  if (!isAuthChecked || !isLoggedIn || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Gnb
        userType={user.role}
        cartCount={0} //장바구니 api 연동 시 교체
        profileName={user.name[0] || ''}
        className="sticky top-0 z-10"
      />
      {children}
    </>
  );
}
