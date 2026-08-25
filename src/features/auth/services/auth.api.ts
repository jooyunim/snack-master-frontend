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

  if (!data.data?.user) {
    throw new Error('로그인에 실패하였습니다.');
  }

  return data.data?.user;
};

export const logoutApi = async (): Promise<void> => {
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
};

export const getUserApi = async (options?: {
  tryRefresh?: boolean;
}): Promise<User> => {
  const tryRefresh = options?.tryRefresh ?? true;

  let res = await fetch(`${API_BASE}/auth/user`, {
    credentials: 'include',
  });

  // 초기 세션 체크: 401/refresh 실패는 비로그인으로만 처리.
  // SESSION_EXPIRED는 apiFetch(로그인 중 API 호출)에서만 발생시킨다.
  if (res.status === 401 && tryRefresh) {
    try {
      await refreshAccessToken();
      res = await fetch(`${API_BASE}/auth/user`, {
        credentials: 'include',
      });
    } catch {
      throw new Error('세션이 만료되었습니다.');
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || '유저 정보를 가져오는데 실패했습니다.');
  }

  const data = await res.json();

  if (!data.data?.user) {
    throw new Error('유저 정보를 가져오는데 실패했습니다.');
  }

  return data.data?.user;
};

let refreshPromise: Promise<void> | null = null;

export const refreshAccessToken = async (): Promise<void> => {
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
