import { apiFetch } from '@/lib/api';
import { User } from '../types/auth.types';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000';

export const loginApi = async (
  email: string,
  password: string
): Promise<User> => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || '로그인에 실패하였습니다.');
  }
  const data = await res.json();

  if (!data.user) {
    throw new Error('로그인에 실패하였습니다.');
  }
  if (typeof data.accessToken !== 'string' || !data.accessToken) {
    throw new Error('토큰이 없습니다.');
  }

  localStorage.setItem('accessToken', data.accessToken);
  return data.user;
};

export const logoutApi = async (): Promise<void> => {
  try {
    const res = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!res.ok) {
      const error = await res.json().catch(() => null);
      throw new Error(error?.message || '로그아웃에 실패했습니다.');
    }
  } finally {
    localStorage.removeItem('accessToken');
  }
};

export const getUserApi = async (): Promise<User> => {
  const res = await apiFetch<{ user: User }>('/auth/user', {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!res?.user) {
    throw new Error('유저 정보를 가져오는데 실패했습니다.');
  }

  return res.user;
};

let refreshPromise: Promise<string> | null = null;

export const refreshAccessToken = async (): Promise<string> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('access token 재발급에 실패했습니다.');
    }

    const data = await res.json();
    const accessToken = data?.data?.accessToken;
    if (typeof accessToken !== 'string' || !accessToken) {
      throw new Error('access token 재발급에 실패했습니다.');
    }

    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  })().finally(() => (refreshPromise = null));
  return refreshPromise;
};

export const adminSignupApi = async (
  email: string,
  name: string,
  password: string,
  passwordConfirm: string,
  companyName: string,
  businessNumber: string
): Promise<void> => {
  const res = await fetch(`${API_BASE}/auth/signup-admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      name,
      password,
      passwordConfirm,
      companyName,
      businessNumber,
    }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || '회원가입에 실패하였습니다.');
  }
};

export const inviteSignupApi = async (
  token: string,
  password: string,
  passwordConfirm: string
) => {
  const res = await fetch(
    `${API_BASE}/auth/signup?token=${encodeURIComponent(token)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, passwordConfirm }),
    }
  );
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || '회원가입에 실패하였습니다.');
  }
};

export const getEmailNameApi = async (token: string) => {
  const res = await fetch(
    `${API_BASE}/auth/email-name?token=${encodeURIComponent(token)}`
  );

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(
      error?.message || '서버로부터 이름, 이메일 값을 가져오는데 실패했습니다.'
    );
  }

  const data = await res.json();
  return data.data;
};
