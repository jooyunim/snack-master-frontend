'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthChecked, isLoggedIn } = useAuth();

  // 초기 인증 확인 전만 대기. 로그인 직후 isLoggedIn은
  // window.location.assign 직전 상태이므로 Loading UI를 띄우지 않는다.
  if (!isAuthChecked) {
    return null;
  }

  if (isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
