// 보호 라우트 진입 전: AT 없/만료면 RT로 refresh 후 브라우저 쿠키에 반영
// 로그인/회원가입: 세션 있으면 /products, 없으면 페이지 유지

import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000';

const ACCESS_MAX_AGE = 15 * 60; // 15분 (초)
const REFRESH_MAX_AGE = 5 * 24 * 60 * 60; // 5일 (초)

function cookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true',
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
    ...(process.env.COOKIE_DOMAIN ? { domain: process.env.COOKIE_DOMAIN } : {}),
  };
}

//서명 검증 없이 exp만 확인. 파싱 실패·만료면 true
function isAccessTokenExpired(token: string): boolean {
  try {
    const payloadPart = token.split('.')[1];
    if (!payloadPart) return true;
    const payload = JSON.parse(
      atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/'))
    ) as { exp?: number };
    if (typeof payload.exp !== 'number') return true;
    return payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

//토큰 추출
function parseTokensFromSetCookie(setCookies: string[]): {
  accessToken?: string;
  refreshToken?: string;
} {
  const tokens: { accessToken?: string; refreshToken?: string } = {};

  for (const header of setCookies) {
    const [nameValue] = header.split(';');
    const eqIndex = nameValue.indexOf('=');
    if (eqIndex === -1) continue;
    const name = nameValue.slice(0, eqIndex).trim();
    const value = nameValue.slice(eqIndex + 1).trim();
    if (name === 'accessToken') tokens.accessToken = value;
    if (name === 'refreshToken') tokens.refreshToken = value;
  }

  return tokens;
}

//토큰 재발급
async function refreshTokens(refreshToken: string) {
  try {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { Cookie: `refreshToken=${refreshToken}` },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) return null;

    const tokens = parseTokensFromSetCookie(response.headers.getSetCookie());
    if (!tokens.accessToken || !tokens.refreshToken) return null;
    return tokens as { accessToken: string; refreshToken: string };
  } catch {
    return null;
  }
}

//쿠키 심기
function setAuthCookies(
  res: NextResponse,
  tokens: { accessToken: string; refreshToken: string }
) {
  res.cookies.set(
    'accessToken',
    tokens.accessToken,
    cookieOptions(ACCESS_MAX_AGE)
  );
  res.cookies.set(
    'refreshToken',
    tokens.refreshToken,
    cookieOptions(REFRESH_MAX_AGE)
  );
  return res;
}

//쿠키 삭제
function clearAuthCookies(res: NextResponse) {
  res.cookies.delete('accessToken');
  res.cookies.delete('refreshToken');
  return res;
}

//로그인 페이지로 리다이렉트
function redirectToLogin(req: NextRequest) {
  return clearAuthCookies(NextResponse.redirect(new URL('/login', req.url)));
}

//상품 페이지로 리다이렉트
function redirectToProducts(req: NextRequest) {
  return NextResponse.redirect(new URL('/products', req.url));
}

//같은 요청 RSC가 새 쿠키를 읽도록 Cookie 헤더 갱신(a.t, r.t만 갱신, 나머지는 유지)
function nextWithAuthCookies(
  req: NextRequest,
  tokens: { accessToken: string; refreshToken: string }
) {
  const requestHeaders = new Headers(req.headers);
  const merged = new Map(
    req.cookies.getAll().map(({ name, value }) => [name, value])
  );
  merged.set('accessToken', tokens.accessToken);
  merged.set('refreshToken', tokens.refreshToken);
  requestHeaders.set(
    'cookie',
    Array.from(merged, ([name, value]) => `${name}=${value}`).join('; ')
  );

  return setAuthCookies(
    NextResponse.next({ request: { headers: requestHeaders } }),
    tokens
  );
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('accessToken')?.value;
  const refreshToken = req.cookies.get('refreshToken')?.value;
  const hasSession = !!(accessToken || refreshToken);
  const isAuthPage = pathname === '/login' || pathname.startsWith('/signup');
  const accessMissingOrExpired =
    !accessToken || isAccessTokenExpired(accessToken);

  // 로그인/회원가입: 토큰 있으면 /products, 없으면 페이지 유지
  if (isAuthPage) {
    if (!hasSession) {
      return NextResponse.next();
    }

    if (!accessMissingOrExpired) {
      return redirectToProducts(req);
    }

    if (refreshToken) {
      const tokens = await refreshTokens(refreshToken);
      if (tokens) {
        return setAuthCookies(redirectToProducts(req), tokens);
      }
    }

    return clearAuthCookies(NextResponse.next());
  }

  // 보호 라우트: AT 유효 → 통과
  if (!accessMissingOrExpired) {
    return NextResponse.next();
  }

  // AT 없/만료 + RT 없음 → 로그인
  if (!refreshToken) {
    return redirectToLogin(req);
  }

  // AT 없/만료 + RT 있음 → 재발급 후 쿠키 반영
  const tokens = await refreshTokens(refreshToken);
  if (!tokens) {
    return redirectToLogin(req);
  }

  return nextWithAuthCookies(req, tokens);
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/signup/:path*',
    '/products',
    '/products/:path*',
    '/user',
    '/cart',
    '/cart/:path*',
    '/wishlist',
    '/purchase-request',
    '/purchase-request/:path*',
    '/purchase-request-manage',
    '/purchase-request-manage/:path*',
    '/purchase',
    '/purchase/:path*',
    '/manage',
    '/manage/:path*',
    '/product-register',
    '/product-register/:path*',
  ],
};
