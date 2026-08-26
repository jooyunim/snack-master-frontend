import { refreshAccessToken } from '@/features/auth/services/auth.api';

// (auth)/login, (auth)/signup 페이지가 실제로 쓰는 환경변수 이름과 맞춤
// (sample.api.ts, purchase-request.api.ts는 아직 미완성 참고용 코드라 NEXT_PUBLIC_API_URL을 씀 — 실제 동작하는 쪽 기준으로 통일)
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000';

export const SESSION_EXPIRED_EVENT = 'auth:session-expired';

// AuthContext isLoggedIn과 동기화 — httpOnly 쿠키는 JS로 못 읽어서
// "로그인된 상태"일 때만 401→refresh를 시도한다.
let apiAuthSessionActive = false;

export function setApiAuthSession(active: boolean) {
  apiAuthSessionActive = active;
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function expireSession() {
  if (typeof window === 'undefined') return;
  apiAuthSessionActive = false;
  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
}

function buildHeaders(options: RequestInit): HeadersInit {
  return {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...options.headers,
  };
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  let refreshed = false;

  let response = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: buildHeaders(options),
  });

  // 로그인 세션이 있을 때만 refresh (비로그인 401에서 /auth/refresh 401 노이즈 방지)
  if (response.status === 401 && apiAuthSessionActive) {
    try {
      await refreshAccessToken();
      refreshed = true;
      response = await fetch(`${API_BASE}${path}`, {
        ...options,
        credentials: 'include',
        headers: buildHeaders(options),
      });
    } catch {
      expireSession();
      throw new ApiError(401, '세션이 만료되었습니다.');
    }
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    // 비로그인 401은 세션 만료가 아님. refresh를 시도한 뒤에만 만료 처리.
    // refresh 성공 후 401도 세션 만료가 아님 (예: 현재 비밀번호 불일치)
    if (response.status === 401 && !refreshed && apiAuthSessionActive) {
      expireSession();
    }

    throw new ApiError(
      response.status,
      body?.message ?? '요청 처리 중 오류가 발생했습니다.'
    );
  }

  return body.data as T;
}
