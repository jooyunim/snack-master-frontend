'use client';

import Gnb from '@/components/Gnb';
import { useAuth } from '@/contexts/AuthContext';
import { useCarts } from '@/features/cart/hooks/useCarts';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthChecked, isLoggedIn, user } = useAuth();
  const router = useRouter();
  const { data: cartData } = useCarts();
  const cartCount = cartData?.cartItem.length ?? 0;

  useEffect(() => {
    if (isAuthChecked && (!isLoggedIn || !user)) {
      router.replace('/login');
    }
  }, [isAuthChecked, isLoggedIn, user, router]);

  if (!isAuthChecked || !isLoggedIn || !user) {
    return (
      <div className="flex h-screen items-center justify-center text-center text-gray-950">
        <span className="text-[20px] font-bold tracking-[-0.4px] text-gray-950">
          로딩중입니다. 잠시만 기다려주세요.
        </span>
      </div>
    );
  }

  return (
    <>
      <Gnb
        userType={user.role}
        cartCount={cartCount}
        profileName={user.name[0] || ''}
        className="sticky top-0 z-10"
      />
      {children}
    </>
  );
}
