'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import logo from '@/assets/icons/logo.svg';
import icLock from '@/assets/icons/ic_lock.svg';
import icManager from '@/assets/icons/ic_manager.svg';
import icCartBag from '@/assets/icons/Vector 2593.svg';
import icCartHandle from '@/assets/icons/Rectangle 22732.svg';
import icLike from '@/assets/icons/ic_like_normal.svg';
import icMenu from '@/assets/icons/ic_menu2.svg';
import icChevronDown from '@/assets/icons/ic_chevron_down.svg';
import SideMenu from '@/components/SideMenu';
import {
  CATEGORIES,
  findCategory,
} from '@/app/(private)/products/constants/categories';
import { Role } from '@/features/auth/types/auth.types';
import { useAuth } from '@/contexts/AuthContext';

type NavItem = {
  label: string;
  href: string;
  roles: Role[];
  matchPaths: string[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: '상품 리스트',
    href: '/products',
    roles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
    matchPaths: ['/products'],
  },
  {
    label: '구매 요청 내역',
    href: '/purchase-request',
    roles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
    matchPaths: ['/purchase-request'],
  },
  {
    label: '상품 등록 내역',
    href: '/product-register',
    roles: ['USER', 'ADMIN', 'SUPER_ADMIN'],
    matchPaths: ['/product-register'],
  },
  {
    label: '구매 요청 관리',
    href: '/purchase-request-manage',
    roles: ['ADMIN', 'SUPER_ADMIN'],
    matchPaths: ['/purchase-request-manage'],
  },
  {
    label: '구매 내역 확인',
    href: '/purchase',
    roles: ['ADMIN', 'SUPER_ADMIN'],
    matchPaths: ['/purchase'],
  },
  {
    label: '관리',
    href: '/manage/members',
    roles: ['SUPER_ADMIN'],
    matchPaths: ['/manage'],
  },
];

type GnbProps = {
  className?: string;
  /** 없으면 비로그인(guest) UI */
  userType?: Role | null;
  cartCount?: number;
  profileName?: string;
  /** user 로딩 중 private 라우트용 — 오른쪽 액션 영역 레이아웃 시프트 방지 */
  isAuthPending?: boolean;
};

function isNavActive(pathname: string, item: NavItem) {
  return item.matchPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

function categoryHref(categorySlug: string) {
  const category = findCategory(categorySlug);
  const params = new URLSearchParams({ category: categorySlug });
  if (category?.children?.length) {
    params.set('sub', category.children[0].slug);
  }
  return `/products?${params.toString()}`;
}

function AuthShellActions() {
  return (
    <div
      className="flex h-11 shrink-0 items-center gap-5 max-lg:gap-8 xl:gap-[30px]"
      aria-hidden="true"
    >
      <div className="size-6 shrink-0 rounded-sm bg-gray-100" />
      <div className="size-6 shrink-0 rounded-full bg-gray-100 max-lg:hidden" />
      <div className="size-6 shrink-0 rounded-full bg-gray-100 max-sm:hidden" />
      <span className="h-2.5 w-px bg-gray-100 max-sm:hidden" />
      <div className="h-4 w-12 rounded-sm bg-gray-100 max-sm:hidden" />
    </div>
  );
}

function GuestActions({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <>
      <nav className="hidden items-center gap-10 sm:flex">
        <Link
          href="/login"
          className="flex items-center gap-1 text-[16px] tracking-[-0.4px] text-gray-950"
        >
          <span className="relative size-6 shrink-0 overflow-hidden">
            <Image src={icLock} alt="" fill className="object-contain" />
          </span>
          로그인
        </Link>
        <Link
          href="/signup"
          className="flex items-center gap-1 text-[16px] tracking-[-0.4px] text-gray-950"
        >
          <span className="relative size-6 shrink-0 overflow-hidden">
            <Image src={icManager} alt="" fill className="object-contain" />
          </span>
          기업 담당자 회원가입
        </Link>
      </nav>

      <button
        type="button"
        aria-label="메뉴 열기"
        onClick={onOpenMenu}
        className="relative size-6 shrink-0 overflow-hidden sm:hidden"
      >
        <Image src={icMenu} alt="" fill className="object-contain" />
      </button>
    </>
  );
}

function AuthNav({ userType, pathname }: { userType: Role; pathname: string }) {
  const items = NAV_ITEMS.filter((item) => item.roles.includes(userType));

  return (
    <nav className="flex items-center gap-[30px] max-xl:hidden">
      {items.map((item) => {
        const active = isNavActive(pathname, item);
        return (
          <Link
            key={item.label}
            href={item.href}
            className="relative flex h-10 items-center justify-center px-1.5 text-[16px] tracking-[-0.4px] text-gray-950 xl:px-2.5"
          >
            {/* ExtraBold 폭을 미리 예약해 활성 전환 시 layout shift 방지 */}
            <span className="invisible font-extrabold" aria-hidden>
              {item.label}
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center ${
                active ? 'font-extrabold' : 'font-normal'
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function AuthActions({
  cartCount,
  profileName,
  onOpenMenu,
}: {
  cartCount: number;
  profileName: string;
  onOpenMenu: () => void;
}) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className="flex h-11 shrink-0 items-center gap-5 max-lg:gap-8 max-sm:h-auto max-sm:gap-5 xl:gap-[30px]">
      <div className="flex items-center gap-5 max-lg:gap-5 xl:gap-[30px]">
        <Link
          href="/cart"
          aria-label={cartCount > 0 ? `장바구니 ${cartCount}개` : '장바구니'}
          className="relative size-6 shrink-0"
        >
          <span className="absolute left-1/2 top-[8.29px] h-[12.705px] w-[15.882px] -translate-x-1/2">
            <Image src={icCartBag} alt="" fill className="object-contain" />
          </span>
          <span className="absolute left-1/2 top-[3px] h-[5.947px] w-[7.411px] -translate-x-1/2">
            <Image src={icCartHandle} alt="" fill className="object-contain" />
          </span>
          {cartCount > 0 ? (
            <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red px-1 text-[9px] font-bold leading-none tracking-[-0.225px] text-white">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          ) : null}
        </Link>

        <Link
          href="/wishlist"
          aria-label="찜하기"
          className="relative size-6 shrink-0 overflow-hidden max-lg:hidden"
        >
          <Image src={icLike} alt="" fill className="object-contain" />
        </Link>

        <Link
          href="/user"
          aria-label="프로필"
          className="relative flex size-6 shrink-0 items-center justify-center cursor-pointer overflow-hidden rounded-full bg-gray-100 text-[10px] tracking-[-0.25px] text-gray-950 max-sm:hidden"
        >
          {profileName}
        </Link>

        <span className="h-2.5 w-px bg-gray-100 max-sm:hidden" aria-hidden />

        <button
          type="button"
          disabled={isLoggingOut}
          onClick={async () => {
            setIsLoggingOut(true);
            try {
              await logout();
              router.replace('/login');
            } catch {
              setIsLoggingOut(false);
            }
          }}
          className="text-[16px] tracking-[-0.4px] text-gray-950 max-sm:hidden cursor-pointer"
        >
          로그아웃
        </button>
      </div>

      <button
        type="button"
        aria-label="메뉴 열기"
        onClick={onOpenMenu}
        className="relative hidden size-6 shrink-0 overflow-hidden max-xl:block"
      >
        <Image src={icMenu} alt="" fill className="object-contain" />
      </button>
    </div>
  );
}

function MobileCategoryDropdown() {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const activeCategory = searchParams.get('category') ?? 'drink';
  const activeLabel = findCategory(activeCategory)?.label ?? '음료';

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label="카테고리 선택"
        onClick={() => setIsOpen((prev) => !prev)}
        className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 max-sm:flex"
      >
        <span className="text-[16px] font-bold tracking-[-0.4px] text-black">
          {activeLabel}
        </span>
        <span
          className={`relative size-5 shrink-0 overflow-hidden transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <Image src={icChevronDown} alt="" fill className="object-contain" />
        </span>
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-full z-20 hidden w-full flex-col items-center gap-2.5 bg-white/90 py-4 backdrop-blur-[15px] max-sm:flex">
          {CATEGORIES.map((category) => {
            const isActive = category.slug === activeCategory;

            return (
              <Link
                key={category.slug}
                href={categoryHref(category.slug)}
                className="flex items-center justify-center p-2"
                onClick={() => setIsOpen(false)}
              >
                <span
                  className={`text-[16px] font-bold tracking-[-0.4px] whitespace-nowrap ${
                    isActive ? 'text-gray-950' : 'text-gray-400'
                  }`}
                >
                  {category.label}
                </span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </>
  );
}

export default function Gnb({
  className = '',
  userType = null,
  cartCount = 0,
  profileName = '',
  isAuthPending = false,
}: GnbProps) {
  const pathname = usePathname();
  const isLoggedIn = userType != null;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <>
      <header
        className={`relative flex h-[90px] w-full items-center justify-between bg-white/90 px-6 py-8 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.02)] backdrop-blur-[15px] lg:px-10 xl:px-[100px] max-lg:h-[100px] max-lg:py-8 max-sm:h-14 max-sm:py-4 max-sm:pl-2.5 max-sm:pr-6 ${className}`.trim()}
      >
        <div className="flex min-w-0 flex-1 items-center gap-6 xl:gap-10">
          <Link
            href={isLoggedIn || isAuthPending ? '/products' : '/'}
            className="relative h-11 w-[102.746px] shrink-0 overflow-hidden"
          >
            <Image
              src={logo}
              alt="스낵마스터 로고"
              fill
              priority
              className="object-contain"
            />
          </Link>
          {isLoggedIn ? (
            <AuthNav userType={userType} pathname={pathname} />
          ) : null}
        </div>

        {isLoggedIn && pathname.startsWith('/products') ? (
          <Suspense fallback={null}>
            <MobileCategoryDropdown />
          </Suspense>
        ) : null}

        {isAuthPending ? (
          <AuthShellActions />
        ) : isLoggedIn ? (
          <AuthActions
            cartCount={cartCount}
            profileName={profileName}
            onOpenMenu={() => setIsSideMenuOpen(true)}
          />
        ) : (
          <GuestActions onOpenMenu={() => setIsSideMenuOpen(true)} />
        )}
      </header>

      {isSideMenuOpen && !isAuthPending ? (
        <div
          className={`fixed inset-0 z-40 ${isLoggedIn ? 'xl:hidden' : 'sm:hidden'}`}
        >
          <button
            type="button"
            aria-label="메뉴 닫기"
            className="absolute inset-0"
            onClick={() => setIsSideMenuOpen(false)}
          />
          {isLoggedIn ? (
            <SideMenu
              userType={userType}
              className="absolute right-0 top-0"
              onClose={() => setIsSideMenuOpen(false)}
            />
          ) : (
            <nav className="absolute right-0 top-0 flex min-w-[200px] flex-col gap-4 bg-white px-6 py-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.08)]">
              <Link
                href="/login"
                className="flex items-center gap-1 text-[16px] tracking-[-0.4px] text-gray-950"
                onClick={() => setIsSideMenuOpen(false)}
              >
                <span className="relative size-6 shrink-0 overflow-hidden">
                  <Image src={icLock} alt="" fill className="object-contain" />
                </span>
                로그인
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-1 text-[16px] tracking-[-0.4px] text-gray-950"
                onClick={() => setIsSideMenuOpen(false)}
              >
                <span className="relative size-6 shrink-0 overflow-hidden">
                  <Image
                    src={icManager}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>
                기업 담당자 회원가입
              </Link>
            </nav>
          )}
        </div>
      ) : null}
    </>
  );
}
