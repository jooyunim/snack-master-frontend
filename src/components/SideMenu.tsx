'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import icXLine from '@/assets/icons/ic_x_line.svg';
import type { UserType } from '@/components/Gnb';

type NavItem = {
  label: string;
  href: string;
  roles: UserType[];
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

type SideMenuProps = {
  userType: UserType;
  className?: string;
  onClose?: () => void;
};

function isNavActive(pathname: string, item: NavItem) {
  return item.matchPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function menuItemClassName(active: boolean) {
  return [
    'flex h-[50px] w-[177px] shrink-0 items-center justify-center p-2 text-[16px] tracking-[-0.4px] whitespace-nowrap transition-colors',
    active
      ? 'font-extrabold text-gray-900'
      : 'font-normal text-gray-700 hover:font-extrabold hover:text-gray-900',
  ].join(' ');
}

export default function SideMenu({
  userType,
  className = '',
  onClose,
}: SideMenuProps) {
  const pathname = usePathname();
  const items = NAV_ITEMS.filter((item) => item.roles.includes(userType));

  return (
    <aside
      className={`flex h-full w-[225px] flex-col items-end gap-5 overflow-hidden bg-white/90 px-6 py-4 backdrop-blur-[15px] ${className}`.trim()}
      aria-label="사이드 메뉴"
    >
      <button
        type="button"
        aria-label="메뉴 닫기"
        onClick={onClose}
        className="relative size-6 shrink-0 overflow-hidden"
      >
        <span className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2">
          <Image src={icXLine} alt="" fill className="object-contain" />
        </span>
        <span className="absolute left-1/2 top-1/2 flex size-2.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <span className="relative size-2.5 -scale-y-100 rotate-180">
            <Image src={icXLine} alt="" fill className="object-contain" />
          </span>
        </span>
      </button>

      <nav className="flex w-full flex-col items-center gap-[13px]">
        {items.map((item) => {
          const active = isNavActive(pathname, item);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={menuItemClassName(active)}
              onClick={onClose}
            >
              {item.label}
            </Link>
          );
        })}

        {/* TODO: 확정 경로로 교체 — 모바일만 노출 */}
        <Link
          href="#"
          className="hidden h-[50px] w-[177px] shrink-0 items-center justify-center p-2 text-[16px] font-normal tracking-[-0.4px] whitespace-nowrap text-gray-700 transition-colors hover:font-extrabold hover:text-gray-900 max-sm:flex"
          onClick={onClose}
        >
          마이페이지
        </Link>

        <button type="button" className={menuItemClassName(false)}>
          로그아웃
        </button>
      </nav>
    </aside>
  );
}

// <SideMenu userType="USER" />
// <SideMenu userType="ADMIN" onClose={() => {}} />
// <SideMenu userType="SUPER_ADMIN" onClose={() => {}} />
