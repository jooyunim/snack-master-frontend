'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import {
  findCategory,
  findSubCategory,
} from '@/app/(private)/products/constants/categories';
import type { Product } from '@/app/(private)/products/constants/products';
import icChevronDown from '@/assets/icons/ic_chevron_down.svg';
import icChevronRight from '@/assets/icons/ic_chevron__right.svg';
import icMenu from '@/assets/icons/ic_menu.svg';
import icPlus from '@/assets/icons/ic_plus.svg';

type AccordionKey = 'benefit' | 'shipping' | 'fee';

type ProductDetailContentProps = {
  product: Product;
};

function formatPrice(price: number) {
  return `${price.toLocaleString('ko-KR')}원`;
}

function MinusIcon() {
  return (
    <span className="relative size-5 shrink-0 overflow-hidden" aria-hidden>
      <span className="absolute inset-y-[46.88%] inset-x-[12.5%] bg-gray-950" />
    </span>
  );
}

function PlusIcon() {
  return (
    <span className="relative size-5 shrink-0 overflow-hidden" aria-hidden>
      <Image src={icPlus} alt="" fill className="object-contain" />
    </span>
  );
}

const ACCORDION_ITEMS: {
  key: AccordionKey;
  title: string;
  content: ReactNode;
}[] = [
  {
    key: 'benefit',
    title: '구매혜택',
    content: (
      <p className="text-[16px] tracking-[-0.4px] text-gray-600 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        5포인트 적립 예정
      </p>
    ),
  },
  {
    key: 'shipping',
    title: '배송 방법',
    content: (
      <p className="text-[16px] tracking-[-0.4px] text-gray-600 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        택배
      </p>
    ),
  },
  {
    key: 'fee',
    title: '배송비',
    content: (
      <div className="flex items-start gap-1.5 text-[16px] tracking-[-0.4px] max-sm:flex-col max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        <p className="text-gray-600">3,000원 (50,000원 이상 무료 배송)</p>
        <p className="text-gray-400">도서산간 배송비 추가</p>
      </div>
    ),
  },
];

export default function ProductDetailContent({
  product,
}: ProductDetailContentProps) {
  const category = findCategory(product.categorySlug);
  const sub =
    product.subSlug != null
      ? findSubCategory(product.categorySlug, product.subSlug)
      : undefined;

  const [openSections, setOpenSections] = useState<Record<AccordionKey, boolean>>(
    {
      benefit: true,
      shipping: true,
      fee: true,
    },
  );

  const toggleSection = (key: AccordionKey) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-[30px] max-sm:px-6">
      <div className="flex h-16 w-full items-center border-b border-solid border-gray-100 pb-5 max-lg:py-5 max-sm:h-auto max-sm:border-b-0 max-sm:p-0">
        <nav
          className="flex items-center gap-1 max-sm:w-full max-sm:pb-2.5 max-sm:pt-3.5"
          aria-label="breadcrumb"
        >
          {category ? (
            <>
              <span
                className={`text-[16px] tracking-[-0.4px] max-sm:text-[14px] max-sm:tracking-[-0.35px] ${
                  sub
                    ? 'text-gray-200 max-sm:text-gray-300'
                    : 'text-gray-950'
                }`}
              >
                {category.label}
              </span>
              {sub ? (
                <>
                  <span className="relative size-4 shrink-0 overflow-hidden">
                    <Image
                      src={icChevronRight}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </span>
                  <span className="text-[16px] tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
                    {sub.label}
                  </span>
                </>
              ) : null}
            </>
          ) : (
            <span className="text-[16px] tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
              상품 상세
            </span>
          )}
        </nav>
      </div>

      <div className="flex w-full items-start gap-[30px] max-lg:flex-col max-lg:gap-5">
        <div
          className="relative size-[540px] shrink-0 overflow-hidden rounded-[2px] bg-gray-50 shadow-[4px_4px_10px_rgba(250,247,243,0.25)] max-lg:aspect-square max-lg:h-auto max-lg:w-full"
          aria-hidden
        />

        <div className="flex min-w-0 flex-1 flex-col gap-8 pt-[30px] max-lg:w-full max-lg:shrink-0">
          <div className="flex w-full items-start gap-5">
            <div className="flex min-w-0 flex-1 items-center justify-between gap-5">
              <div className="flex min-w-0 flex-col gap-2 whitespace-nowrap">
                <div className="flex items-center gap-2 max-sm:flex-col max-sm:items-start">
                  <p className="text-[18px] tracking-[-0.45px] text-black">
                    {product.name}
                  </p>
                  <p className="text-[14px] font-bold tracking-[-0.35px] text-secondary-500">
                    {product.purchaseCount}회 구매
                  </p>
                </div>
                <p className="text-[18px] font-extrabold tracking-[-0.45px] text-black">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3.5">
                <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                  수량
                </span>
                <button
                  type="button"
                  className="flex h-[52px] w-[100px] items-center justify-end gap-1 overflow-hidden rounded-[2px] border border-solid border-gray-300 bg-white p-3.5"
                  aria-label="수량 선택"
                >
                  <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                    16
                  </span>
                  <span className="relative size-6 shrink-0 overflow-hidden">
                    <Image
                      src={icChevronDown}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </span>
                </button>
              </div>
            </div>

            <div className="relative shrink-0">
              <span className="relative flex size-6 shrink-0 overflow-hidden">
                <Image src={icMenu} alt="" fill className="object-contain" />
              </span>
              <div className="absolute top-full right-0 z-10 flex w-[95px] flex-col items-start justify-center overflow-hidden border border-solid border-gray-100 bg-white">
                <div className="flex h-[50px] w-full items-center py-2 pr-5 pl-4">
                  <span className="text-center text-[16px] tracking-[-0.4px] text-gray-950">
                    상품 수정
                  </span>
                </div>
                <div className="flex h-[50px] w-full items-center py-2 pr-5 pl-4">
                  <span className="text-center text-[16px] tracking-[-0.4px] text-gray-950">
                    상품 삭제
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-2.5">
            <Button type="button">장바구니 담기</Button>

            <div className="flex w-full flex-col">
              {ACCORDION_ITEMS.map((item, index) => {
                const isOpen = openSections[item.key];
                const isLast = index === ACCORDION_ITEMS.length - 1;

                return (
                  <div
                    key={item.key}
                    className={`flex flex-col gap-1.5 py-10 max-sm:py-[30px] ${
                      isLast
                        ? ''
                        : 'border-b border-solid border-gray-100 max-lg:border-gray-200 max-sm:border-gray-100'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSection(item.key)}
                      className="flex w-full items-center justify-between"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[18px] font-bold tracking-[-0.45px] text-gray-950 max-sm:text-[16px] max-sm:tracking-[-0.4px]">
                        {item.title}
                      </span>
                      {isOpen ? <MinusIcon /> : <PlusIcon />}
                    </button>
                    {isOpen ? item.content : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
