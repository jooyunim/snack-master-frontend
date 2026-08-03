'use client';

import {
  getUserApi,
  loginApi,
  logoutApi,
} from '@/features/auth/services/auth.api';
import { User } from '@/features/auth/types/auth.types';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import type { LoginFormValues } from '@/features/auth/schemas/auth';

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

  const logout = async () => {
    if (!isAuthChecked) return;
    try {
      await logoutApi();
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
      localStorage.removeItem('accessToken');
    }
  };

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        if (!localStorage.getItem('accessToken')) {
          if (!cancelled) {
            setUser(null);
          }
          return;
        }

        const user = await getUserApi();
        if (!cancelled) {
          setUser(user);
        }
      } catch {
        // 로그인 직후 늦게 도착한 실패가 세션을 덮어쓰지 않도록 함
        if (!cancelled && !localStorage.getItem('accessToken')) {
          setUser(null);
        }
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
