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
          window.location.replace('/login');
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

      // 로그인/회원가입은 세션 체크 자체가 불필요.
      // GET /auth/user는 authenticate라 비로그인이면 401 → 콘솔 노이즈만 남음.
      if (isAuthPage) {
        if (!cancelled) {
          setIsAuthChecked(true);
        }
        return;
      }

      try {
        const user = await getUserApi();
        if (!cancelled) {
          setUser(user);
        }
      } catch {
        // accessToken 쿠키 없음/만료 — user는 null 유지
        // login()은 isAuthChecked 이후에만 호출되므로 race 없음
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
