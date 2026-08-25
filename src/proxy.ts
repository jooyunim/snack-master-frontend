//페이지 진입 전 쿠키 유무 확인 후 리다이렉트

import { NextRequest, NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  console.log('[proxy]', {
    pathname: req.nextUrl.pathname,
    hasAccessToken: !!req.cookies.get('accessToken')?.value,
    hasRefreshToken: !!req.cookies.get('refreshToken')?.value,
  });

  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;
  const hasSession = !!(
    req.cookies.get('accessToken')?.value ||
    req.cookies.get('refreshToken')?.value
  );

  const isAuthPage = pathname === '/login' || pathname.startsWith('/signup');

  if (isAuthPage) {
    if (hasSession) {
      return NextResponse.redirect(new URL('/products', req.url));
    }
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
  ],
};
