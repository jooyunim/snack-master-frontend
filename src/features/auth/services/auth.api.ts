import { User } from '../types/auth.types';

export const refreshAccessToken = async (): Promise<string> => {
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
    throw new Error('서버로부터 리프레쉬 토큰을 가져오는데 실패하였습니다.');
  }

  const data = await res.json();
  localStorage.setItem('accessToken', data.data.accessToken);
  return data.data.accessToken;
};

export const loginApi = async (
  email: string,
  password: string
): Promise<User> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error('로그인에 실패하였습니다.');
  }
  const data = await res.json();

  if (!data.user) {
    throw new Error('로그인에 실패하였습니다.');
  }
  if (!data.accessToken) {
    throw new Error('토큰이 없습니다.');
  }

  localStorage.setItem('accessToken', data.accessToken);
  return data.user;
};

export const logoutApi = async (): Promise<void> => {
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
};

export const getUserApi = async (): Promise<User> => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('토큰이 없습니다.');
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });
  if (!res.ok) {
    localStorage.removeItem('accessToken');
    throw new Error('토큰이 만료되었습니다.');
  }
  const data = await res.json();

  if (!data?.user) {
    localStorage.removeItem('accessToken');
    throw new Error('유저에 대한 정보가 없습니다.');
  }
  return data.user;
};
