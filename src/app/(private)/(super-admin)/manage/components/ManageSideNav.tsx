'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import icMemberOff from '@/assets/icons/active=off-1.svg';
import icMemberOn from '@/assets/icons/active=on-1.svg';
import icBudgetOff from '@/assets/icons/active=off.svg';
import icBudgetOn from '@/assets/icons/active=on.svg';

type ManageNavItem = {
  label: string;
  href: string;
  matchPaths: string[];
  iconOff: typeof icMemberOff;
  iconOn: typeof icMemberOn;
};

const MANAGE_NAV_ITEMS: ManageNavItem[] = [
  {
    label: '회원 관리',
    href: '/manage/members',
    matchPaths: ['/manage/members'],
    iconOff: icMemberOff,
    iconOn: icMemberOn,
  },
  {
    label: '예산 관리',
    href: '/manage/budget',
    matchPaths: ['/manage/budget'],
    iconOff: icBudgetOff,
    iconOn: icBudgetOn,
  },
];

type ManageSideNavProps = {
  className?: string;
};

function isActive(pathname: string, item: ManageNavItem) {
  return item.matchPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

export default function ManageSideNav({ className = '' }: ManageSideNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={`flex w-[180px] shrink-0 flex-col gap-1 max-lg:w-full max-lg:flex-row max-lg:gap-0 ${className}`.trim()}
      aria-label="관리 메뉴"
    >
      {MANAGE_NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item);
        const icon = active ? item.iconOn : item.iconOff;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex h-[50px] w-full items-center gap-2 px-[18px] py-2.5 max-lg:flex-1 max-lg:justify-center max-lg:border-b max-lg:border-solid max-sm:h-auto max-sm:py-3 ${
              active
                ? 'bg-gray-50 max-lg:border-b-2 max-lg:border-gray-950 max-lg:bg-transparent'
                : 'max-lg:border-gray-200'
            }`}
            aria-current={active ? 'page' : undefined}
          >
            <span className="relative size-5 shrink-0 overflow-hidden max-lg:size-6 max-sm:size-5">
              <Image src={icon} alt="" fill className="object-contain" />
            </span>
            <span
              className={`text-[16px] tracking-[-0.4px] whitespace-nowrap max-sm:text-[14px] max-sm:tracking-[-0.35px] ${
                active ? 'font-bold text-gray-950' : 'font-normal text-gray-500'
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
