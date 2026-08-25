'use client';

import {
  getUserApi,
  loginApi,
  logoutApi,
} from '@/features/auth/services/auth.api';
import { User } from '@/features/auth/types/auth.types';
import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import type { LoginFormValues } from '@/features/auth/schemas/auth';
import { useQueryClient } from '@tanstack/react-query';
import {
  cartQueryKeys,
  companyBalancePointQueryKeys,
  orderItemsQueryKeys,
} from '@/features/cart/constants/query-keys';
import { SESSION_EXPIRED_EVENT, setApiAuthSession } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAuthChecked: boolean;
  login: (data: LoginFormValues) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
  initialUser,
}: {
  children: ReactNode;
  initialUser?: User | null;
}) => {
  const [user, setUser] = useState<User | null>(initialUser ?? null);
  const [isAuthChecked, setIsAuthChecked] = useState(initialUser !== undefined);
  const isLoggedIn = !!user;
  const queryClient = useQueryClient();

  // apiFetch가 401→refresh를 로그인 중에만 시도하도록 동기화
  useEffect(() => {
    setApiAuthSession(isLoggedIn);
  }, [isLoggedIn]);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (!isAuthChecked) {
      throw new Error('인증 확인 중입니다. 잠시 후 다시 시도해주세요.');
    }

    const user = await loginApi(email, password);
    setApiAuthSession(true);
    setUser(user);
  };

  const clearClientSession = useCallback(() => {
    setApiAuthSession(false);
    setUser(null);
    queryClient.removeQueries({ queryKey: cartQueryKeys.all });
    queryClient.removeQueries({ queryKey: orderItemsQueryKeys.all });
    queryClient.removeQueries({
      queryKey: companyBalancePointQueryKeys.all,
    });
  }, [queryClient]);

  const logout = async () => {
    if (!isAuthChecked) return;
    try {
      await logoutApi();
    } catch (error) {
      console.error(error);
    } finally {
      clearClientSession();
    }
  };

  useEffect(() => {
    const onSessionExpired = () => {
      void (async () => {
        try {
          await logoutApi();
        } catch {
          //쿠키 삭제 실패해도 비로그인 처리
        } finally {
          clearClientSession();
          const path = window.location.pathname;
          // 이미 로그인/가입 페이지면 replace 루프(깜빡임/무한 로딩) 방지
          if (path !== '/login' && !path.startsWith('/signup')) {
            window.location.replace('/login');
          }
        }
      })();
    };
    window.addEventListener(SESSION_EXPIRED_EVENT, onSessionExpired);
    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, onSessionExpired);
    };
  }, [clearClientSession]);

  useEffect(() => {
    let cancelled = false;

    if (initialUser !== undefined) {
      return;
    }
    const checkAuth = async () => {
      const path = window.location.pathname;
      const isAuthPage = path === '/login' || path.startsWith('/signup');

      // 로그인/회원가입은 세션 체크 스킵.
      // API 호스트에만 쿠키가 있어도 getUser는 성공하는데, 그때 /products로 보내면
      // FE proxy가 쿠키를 못 보고 다시 /login으로 보내는 루프가 난다.
      if (isAuthPage) {
        if (!cancelled) {
          setIsAuthChecked(true);
        }
        return;
      }

      try {
        const nextUser = await getUserApi();
        if (!cancelled) {
          setUser(nextUser);
        }
      } catch {
        // accessToken 쿠키 없음/만료 — user는 null 유지
      } finally {
        if (!cancelled) {
          setIsAuthChecked(true);
        }
      }
    };

    void checkAuth();

    return () => {
      cancelled = true;
    };
  }, [initialUser]);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, isAuthChecked, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
