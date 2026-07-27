import { User } from '../types/auth.types';

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
  } finally {
    localStorage.removeItem('accessToken');
  }
};

export const getUserApi = async (): Promise<User> => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('토큰이 없습니다.');
  }
  const res = await authFetch('/auth/user', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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
      throw new Error('access token 재발급에 실패했습니다.');
    }

    const data = await res.json();
    const accessToken = data?.data?.accessToken;
    if (typeof accessToken !== 'string' || !accessToken) {
      throw new Error('access token 재발급에 실패했습니다.');
    }
    return accessToken;
  })().finally(() => (refreshPromise = null));
  return refreshPromise;
};

const authFetch = async (url: string, options: RequestInit) => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('인증 토큰이 없습니다.');
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  });

  if (res.ok) {
    return await res.json();
  } else if (res.status === 401) {
    let newToken: string;

    try {
      newToken = await refreshAccessToken();
    } catch {
      try {
        await logoutApi();
      } catch {}

      localStorage.removeItem('accessToken');
      throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }

    localStorage.setItem('accessToken', newToken);

    const newRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${newToken}`,
      },
      credentials: 'include',
    });

    if (newRes.status === 401) {
      await logoutApi();
      throw new Error('인증이 만료되었습니다.');
    }

    if (!newRes.ok) {
      throw new Error(`요청 실패 : ${newRes.status} ${newRes.statusText}`);
    }

    return await newRes.json();
  } else {
    throw new Error('서버 요청에 실패했습니다.');
  }
};
