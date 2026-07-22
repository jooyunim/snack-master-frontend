'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import icChevronDown from '@/assets/icons/ic_chevron_down.svg';
import icChevronUp from '@/assets/icons/ic_chevron_up.svg';
import { CATEGORIES } from '@/app/(private)/products/constants/categories';

type CategorySideNavProps = {
  className?: string;
};

function categoryHref(categorySlug: string, subSlug?: string) {
  const params = new URLSearchParams({ category: categorySlug });
  if (subSlug) params.set('sub', subSlug);
  return `/products?${params.toString()}`;
}

export default function CategorySideNav({
  className = '',
}: CategorySideNavProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') ?? 'drink';
  const activeSub = searchParams.get('sub') ?? 'soda';

  return (
    <nav
      className={`flex w-[180px] shrink-0 flex-col gap-2.5 bg-white max-sm:w-full max-sm:gap-0 ${className}`.trim()}
      aria-label="카테고리"
    >
      <div className="flex w-full items-center px-3.5 py-2.5 max-sm:hidden">
        <h2 className="text-[18px] font-bold tracking-[-0.45px] text-gray-950">
          카테고리
        </h2>
      </div>

      <ul className="flex w-full flex-col gap-1 max-sm:flex-row max-sm:gap-2 max-sm:overflow-x-auto max-sm:border-b max-sm:border-solid max-sm:border-gray-100 max-sm:px-6">
        {CATEGORIES.map((category) => {
          const hasChildren = Boolean(category.children?.length);
          const href = hasChildren
            ? categoryHref(category.slug, category.children![0].slug)
            : categoryHref(category.slug);
          const isExpanded = hasChildren && activeCategory === category.slug;
          const isLeafActive = !hasChildren && activeCategory === category.slug;

          return (
            <li
              key={category.slug}
              className="flex w-full flex-col max-sm:contents"
            >
              <Link
                href={href}
                className={`flex h-[50px] w-full items-center justify-between p-3.5 ${
                  isExpanded ? 'border-t-2 border-solid border-gray-950' : ''
                } ${
                  hasChildren
                    ? 'max-sm:hidden'
                    : 'max-sm:h-[52px] max-sm:w-auto max-sm:shrink-0 max-sm:justify-center max-sm:border-0 max-sm:px-2 max-sm:py-3.5'
                }`}
              >
                <span
                  className={`text-[16px] tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px] ${
                    isExpanded || isLeafActive
                      ? 'font-bold'
                      : 'font-normal max-sm:text-gray-400'
                  }`}
                >
                  {category.label}
                </span>
                <span className="relative size-4 shrink-0 overflow-hidden max-sm:hidden">
                  <Image
                    src={isExpanded ? icChevronUp : icChevronDown}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>
              </Link>

              {hasChildren && isExpanded
                ? category.children!.map((child) => {
                    const childHref = categoryHref(category.slug, child.slug);
                    const isActive =
                      activeCategory === category.slug &&
                      activeSub === child.slug;

                    return (
                      <Link
                        key={child.slug}
                        href={childHref}
                        className="flex h-[50px] w-full items-center px-[30px] py-2.5 max-sm:h-[52px] max-sm:w-auto max-sm:shrink-0 max-sm:justify-center max-sm:px-2 max-sm:py-3.5"
                      >
                        <span
                          className={`text-[16px] tracking-[-0.4px] max-sm:text-[14px] max-sm:tracking-[-0.35px] ${
                            isActive
                              ? 'font-bold text-gray-950'
                              : 'font-normal text-gray-500 max-sm:text-gray-400'
                          }`}
                        >
                          {child.label}
                        </span>
                      </Link>
                    );
                  })
                : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
