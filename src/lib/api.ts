// (auth)/login, (auth)/signup 페이지가 실제로 쓰는 환경변수 이름과 맞춤
// (sample.api.ts, purchase-request.api.ts는 아직 미완성 참고용 코드라 NEXT_PUBLIC_API_URL을 씀 — 실제 동작하는 쪽 기준으로 통일)
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000';

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

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getAccessToken();

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      body?.message ?? '요청 처리 중 오류가 발생했습니다.',
    );
  }

  return body.data as T;
}
