import { AuthTokens } from '@/types/auth.type';
import { NextResponse } from 'next/server';

export const ACCESS_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.COOKIE_SECURE === 'true',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 15 * 60, //15분
};

export const REFRESH_COOKIE_OPTIONS = {
  ...ACCESS_COOKIE_OPTIONS,
  maxAge: 5 * 24 * 60 * 60, //5일
};

//BE로 fetch, 브라우저 Cookie 헤더를 BE에 전달
export async function proxyToBackend(
  req: Request,
  bePath: string,
  options: RequestInit
) {
  const cookieHeader = req.headers.get('cookie');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${bePath}`,
    {
      ...options,
      headers: {
        ...options.headers,
        ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      },
    }
  );
  return response;
}

//BE Set-Cookie에서 accessToken/refreshToken 추출
export function parseSetCookieTokens(setCookieHeaders: string[]): AuthTokens {
  const tokens: AuthTokens = {};

  for (const header of setCookieHeaders) {
    const [nameValue] = header.split(';');
    const eqIndex = nameValue.indexOf('=');
    if (eqIndex === -1) continue;

    const name = nameValue.slice(0, eqIndex).trim();
    const value = nameValue.slice(eqIndex + 1).trim();

    if (name === 'accessToken' || name === 'refreshToken') {
      tokens[name] = value;
    }
  }

  return tokens;
}

//set-cookie 헤더 생성, httpOnly, sameSite: lax, maxAge (BE auth.controller.ts와 동일)
export async function setAuthCookies(res: NextResponse, tokens: AuthTokens) {
  if (tokens.accessToken) {
    res.cookies.set('accessToken', tokens.accessToken, ACCESS_COOKIE_OPTIONS);
  }
  if (tokens.refreshToken) {
    res.cookies.set(
      'refreshToken',
      tokens.refreshToken,
      REFRESH_COOKIE_OPTIONS
    );
  }
}

//logout 시 쿠키 삭제
export async function clearAuthCookies(res: NextResponse) {
  res.cookies.set('accessToken', '', {
    ...ACCESS_COOKIE_OPTIONS,
    maxAge: 0,
  });
  res.cookies.set('refreshToken', '', {
    ...REFRESH_COOKIE_OPTIONS,
    maxAge: 0,
  });
}
