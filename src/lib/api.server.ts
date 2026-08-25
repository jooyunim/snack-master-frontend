// 서버 전용 fetch

import { cookies } from 'next/headers';
import { ApiError } from './api';
import { AuthTokens } from '@/types/auth.type';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000';

function buildHeaders(options: RequestInit): HeadersInit {
  return {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...options.headers,
  };
}

//서버에서 be로 요청 보낼 때, 브라우저 쿠키 내용을 http cookie 헤더 문자열로 변환
//fetch({credentials: 'include'}) 요청 시, 브라우저 쿠키 자동 전달
//Next.js 서버 컴포넌트/서버 함수에서 BE로 fetch할 때는 브라우저가 아니라 Node.js가 요청을 보내므로, 쿠키가 자동으로 전달 되지 않음
//그래서 cookies()로 읽은 토큰을 직접 Cookie 헤더로 만들어야 함.
export function buildCookieHeader(tokens: AuthTokens): string | undefined {
  const parts: string[] = [];
  if (tokens.accessToken) parts.push(`accessToken=${tokens.accessToken}`);
  if (tokens.refreshToken) parts.push(`refreshToken=${tokens.refreshToken}`);
  return parts.length > 0 ? parts.join('; ') : undefined; // 둘 다 있으면 ; 로 이어서 하나의 헤더 값 생성
}

async function getAuthTokens(): Promise<AuthTokens> {
  const cookieStore = await cookies();
  // 쿠키 있음 → { name: 'accessToken', value: 'eyJ...' } 객체로 반환
  // 쿠키 없음 → undefined

  return {
    accessToken: cookieStore.get('accessToken')?.value,
    refreshToken: cookieStore.get('refreshToken')?.value,
  };
}

//만료된 a.t r.t로 갱신
async function refreshAuthTokens(
  refreshToken: string
): Promise<AuthTokens | null> {
  const response = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  //set-cookie에서 토큰 파싱해서 authTokens 반환
  const setCookieHeaders = response.headers.getSetCookie();
  const tokens: AuthTokens = {};

  for (const header of setCookieHeaders) {
    const [nameValue] = header.split(';');
    const eqIndex = nameValue.indexOf('=');
    if (eqIndex === -1) continue;
    const name = nameValue.slice(0, eqIndex).trim();
    const value = nameValue.slice(eqIndex + 1).trim();
    if (name === 'accessToken') {
      tokens.accessToken = value;
    } else if (name === 'refreshToken') {
      tokens.refreshToken = value;
    }
  }

  return tokens.accessToken && tokens.refreshToken ? tokens : null;
}

//be로 api 호출할 때 토큰을 쿠키 헤더로 전달(요청 보내기만, 이 토큰으로 이 경로에 be fetch 하기)
async function requestWithTokens(
  path: string, //be 경로
  options: RequestInit, //method, body 등
  tokens: AuthTokens
): Promise<Response> {
  const cookieHeader = buildCookieHeader(tokens);

  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...buildHeaders(options),
      ...(cookieHeader ? { Cookie: cookieHeader } : {}), //토큰 있으면 쿠키 헤더 추가, 없으면 안 붙임
    },
  });
}

//서버에서 be api를 호출, 401 에러 발생 시 토큰 갱신 시도
export async function apiServer(
  path: string,
  options: RequestInit = {}
): Promise<{ response: Response; refreshed: boolean }> {
  const tokens = await getAuthTokens(); //현재 쿠키에 있는 토큰 가져오기
  let response = await requestWithTokens(path, options, tokens); //그 토큰으로 path에 요청

  if (response.status !== 401 || !tokens.refreshToken) {
    return { response, refreshed: false };
  }

  const newTokens = await refreshAuthTokens(tokens.refreshToken);
  if (!newTokens?.accessToken) {
    return { response, refreshed: false };
  }

  const mergedTokens: AuthTokens = {
    accessToken: newTokens.accessToken ?? tokens.accessToken,
    refreshToken: newTokens.refreshToken ?? tokens.refreshToken,
  };

  response = await requestWithTokens(path, options, mergedTokens);
  return { response, refreshed: true };
}

//서버 fetch 결과를 데이터/apiError 객체로 바꿔 주는 편의 함수
export async function apiServerFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const { response, refreshed } = await apiServer(path, options);
  const body = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401 && !refreshed) {
      throw new ApiError(401, '세션이 만료되었습니다.');
    }

    throw new ApiError(
      response.status,
      body?.message ?? '요청 처리 중 오류가 발생했습니다.'
    );
  }

  return body.data as T;
}
