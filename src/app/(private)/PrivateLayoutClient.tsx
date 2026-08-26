'use client';

import Gnb from '@/components/Gnb';
import { useAuth } from '@/contexts/AuthContext';
import type { User } from '@/features/auth/types/auth.types';
import { useCarts } from '@/features/cart/hooks/useCarts';
import { useLayoutEffect } from 'react';

export default function PrivateLayoutClient({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const { hydrateUser } = useAuth();
  const { data: cartData } = useCarts();
  const cartCount = cartData?.cartItem.length ?? 0;

  useLayoutEffect(() => {
    hydrateUser(user);
  }, [hydrateUser, user]);

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
