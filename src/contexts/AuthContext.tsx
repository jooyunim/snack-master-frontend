'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface User {
  email: string;
  name: string;
  id: string;
  companyId: number;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAuthChecked: boolean;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
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
    const safeEmail = typeof email === 'string' ? email.trim() : '';
    const safePassword = typeof password === 'string' ? password : '';

    if (!safeEmail) {
      throw new Error('유효하지 않는 이메일입니다.');
    }

    if (!safePassword) {
      throw new Error('유효하지 않는 비밀번호입니다.');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: safeEmail, password: safePassword }),
      }
    );

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      throw new Error(error?.message || '로그인에 실패했습니다.');
    }

    const data = await res.json();

    if (!data?.user) {
      throw new Error('로그인에 실패했습니다.');
    }

    if (!data?.accessToken) {
      throw new Error('토큰이 없습니다.');
    }

    setUser(data.user);
    localStorage.setItem('accessToken', data.accessToken);
  };

  const logout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message || '로그아웃에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUser(null);
      localStorage.removeItem('accessToken');
    }
  };

  const refreshAccessToken = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    );
    if (!res.ok) {
      throw new Error('서버로부터 토큰 갱신에 실패했습니다.');
    }
    const data = await res.json();
    if (!data?.accessToken) {
      throw new Error('토큰이 없습니다.');
    }
    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('토큰이 없습니다.');
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        }
      );
      if (!res.ok) {
        localStorage.removeItem('accessToken');
        throw new Error('토큰이 만료되었습니다.');
      }
      const data = await res.json();

      if (!data?.user) {
        throw new Error('유저에 대한 정보가 없습니다.');
      }

      setUser(data.user);
      return data;
    } catch {
      setUser(null);
      return null;
    } finally {
      setIsAuthChecked(true);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      await getUser();
    };
    void checkAuth();
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
