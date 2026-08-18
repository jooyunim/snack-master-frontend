import { refreshAccessToken } from '@/features/auth/services/auth.api';

// (auth)/login, (auth)/signup 페이지가 실제로 쓰는 환경변수 이름과 맞춤
// (sample.api.ts, purchase-request.api.ts는 아직 미완성 참고용 코드라 NEXT_PUBLIC_API_URL을 씀 — 실제 동작하는 쪽 기준으로 통일)
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000';

export const SESSION_EXPIRED_EVENT = 'auth:session-expired';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// 실제 로그인 구현 확인 완료: localStorage.setItem('accessToken', ...) 그대로 씀
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

function expireSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
}

function buildHeaders(options: RequestInit, token: string | null): HeadersInit {
  return {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
}

// features/auth/services/auth.api.ts의 authFetch와 같은 401 -> refresh -> 1회 재시도 흐름을
// 그대로 따름 (해당 함수는 auth 모듈 내부 전용이라 export가 안 돼 있어, 이미 export된
// refreshAccessToken만 재사용해서 동일한 흐름을 여기서도 구현함).
export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  let token = getAccessToken();

  let response = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: buildHeaders(options, token),
  });

  if (response.status === 401 && token) {
    try {
      token = await refreshAccessToken();
      response = await fetch(`${API_BASE}${path}`, {
        ...options,
        credentials: 'include',
        headers: buildHeaders(options, token),
      });
    } catch {
      expireSession();
      throw new ApiError(401, '세션이 만료되었습니다.');
    }
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    // 로그인 중 토큰이 사라진 경우. refresh에 성공한 뒤의 401은
    // (예: 현재 비밀번호 불일치) 세션 만료가 아니므로 여기서 끊지 않음.
    if (response.status === 401 && !token) {
      expireSession();
    }

    throw new ApiError(
      response.status,
      body?.message ?? '요청 처리 중 오류가 발생했습니다.'
    );
  }

  return body.data as T;
}
