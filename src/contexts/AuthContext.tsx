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
import { SESSION_EXPIRED_EVENT } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAuthChecked: boolean;
  login: (data: LoginFormValues) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const isLoggedIn = !!user;
  const queryClient = useQueryClient();

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

    setUser(user);
  };

  const clearClientSession = useCallback(() => {
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
      clearClientSession();
    };
    window.addEventListener(SESSION_EXPIRED_EVENT, onSessionExpired);
    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, onSessionExpired);
    };
  }, [clearClientSession]);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
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
  }, []);

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
