//페이지 진입 전 쿠키 유무 확인 후 리다이렉트

import { NextRequest, NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;
  const hasSession = !!(
    req.cookies.get('accessToken')?.value ||
    req.cookies.get('refreshToken')?.value
  );

  const isAuthPage = pathname === '/login' || pathname.startsWith('/signup');

  // 쿠키 존재 ≠ 유효 세션. /login→/products 강제 리다이렉트는
  // 만료·무효 쿠키 + SESSION_EXPIRED(/login)와 맞물려 무한 루프가 난다.
  // 로그인/회원가입은 항상 통과시키고, 보호 라우트만 쿠키 유무로 가드한다.
  if (isAuthPage) {
    return NextResponse.next();
  }

  if (!hasSession) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  return NextResponse.next();
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
    '/unauthorized',
  ],
};
