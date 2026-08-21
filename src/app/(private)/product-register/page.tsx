'use client';

import { useMemo, useState } from 'react';
import Button from '@/components/Button';
import SortDropdown from '@/components/SortDropdown';
import { useCategories } from '@/features/product/hooks/useCategories';
import { useMyProducts } from '@/features/product/hooks/useMyProducts';
import type {
  Product,
  ProductSort,
} from '@/features/product/types/product.types';

const SORT_OPTIONS: { label: string; value: ProductSort }[] = [
  { label: '최신순', value: 'recent' },
  { label: '판매순', value: 'sales' },
  { label: '낮은 가격순', value: 'priceAsc' },
  { label: '높은 가격순', value: 'priceDesc' },
];

function formatDate(iso: string) {
  const date = new Date(iso);
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(
    date.getDate()
  ).padStart(2, '0')}`;
}

function formatPrice(price: number) {
  return price.toLocaleString('ko-KR');
}

export default function ProductRegisterPage() {
  const { data: categories } = useCategories();
  const [sort, setSort] = useState<ProductSort>('recent');
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMyProducts(sort);

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data]
  );
  const totalCount = data?.pages[0]?.totalCount ?? 0;

  const categoryNames = useMemo(
    () =>
      new Map(
        categories?.flatMap((parent) =>
          parent.children.map((child) => [child.id, child.name] as const)
        ) ?? []
      ),
    [categories]
  );

  function categoryName(product: Product) {
    return categoryNames.get(product.categoryId) ?? '-';
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-[18px] px-6 pb-20 pt-20 max-lg:gap-5 max-lg:pt-10 max-sm:pt-5">
        <div className="relative flex w-full items-center justify-between max-lg:border-b max-lg:border-solid max-lg:border-gray-100 max-lg:pb-5 max-lg:pt-2.5">
          <h1 className="text-[18px] font-bold tracking-[-0.45px] text-gray-950">
            상품 등록 내역
          </h1>
          <SortDropdown
            options={SORT_OPTIONS}
            value={sort}
            onChange={(value) => setSort(value as ProductSort)}
          />
        </div>

        {products.length === 0 ? (
          <div className="flex w-full items-center justify-center py-20">
            <p className="text-[16px] tracking-[-0.4px] text-gray-500">
              등록한 상품이 없습니다.
            </p>
          </div>
        ) : (
          <div className="flex w-full flex-col items-end gap-[30px] max-sm:gap-5">
            {/* PC table */}
            <div className="flex w-full flex-col max-lg:hidden">
              <div className="flex w-full items-center justify-between border-y border-solid border-gray-100 px-10 py-5">
                <div className="flex shrink-0 items-center pl-[60px]">
                  <span className="w-[260px] text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                    상품명
                  </span>
                </div>
                <span className="w-[180px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                  등록일
                </span>
                <span className="w-[180px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                  카테고리
                </span>
                <span className="w-[160px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                  가격
                </span>
                <span className="w-[180px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                  제품 링크
                </span>
              </div>

              <ul className="flex w-full flex-col">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="flex h-[100px] w-full items-center justify-between border-b border-solid border-gray-100 px-10"
                  >
                    <div className="flex shrink-0 items-center gap-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.imageUrl}
                        alt=""
                        className="size-10 shrink-0 overflow-hidden rounded-[2px] bg-gray-25 object-cover"
                      />
                      <span className="w-[260px] text-[16px] tracking-[-0.4px] text-gray-950">
                        {product.name}
                      </span>
                    </div>
                    <span className="w-[180px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950">
                      {formatDate(product.createdAt)}
                    </span>
                    <span className="w-[180px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950">
                      {categoryName(product)}
                    </span>
                    <span className="w-[160px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950">
                      {formatPrice(product.price)}
                    </span>
                    <span
                      className="w-[180px] shrink-0 truncate text-[16px] tracking-[-0.4px] text-gray-950"
                      title={product.linkUrl}
                    >
                      {product.linkUrl}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tablet / Mobile card list */}
            <div className="hidden w-full flex-col max-lg:flex max-sm:gap-2.5">
              <p className="text-[16px] font-bold tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
                총 등록한 상품 {totalCount}개
              </p>
              <ul className="flex w-full flex-col">
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="flex h-[180px] w-full flex-col gap-2.5 border-b border-solid border-gray-100 py-[30px] max-sm:h-auto max-sm:pb-[30px] max-sm:pt-5"
                  >
                    <p className="text-[16px] font-extrabold tracking-[-0.4px] text-gray-950">
                      {formatDate(product.createdAt)}
                    </p>
                    <div className="flex w-full items-center gap-5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.imageUrl}
                        alt=""
                        className="size-[90px] shrink-0 overflow-hidden rounded-[2px] bg-gray-50 object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                        <div className="flex flex-col gap-1 max-sm:gap-1.5">
                          <p className="text-[12px] tracking-[-0.3px] text-gray-500">
                            {categoryName(product)}
                          </p>
                          <p className="text-[16px] tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
                            {product.name}
                          </p>
                          <p className="text-[14px] font-extrabold tracking-[-0.35px] text-gray-950">
                            {formatPrice(product.price)}원
                          </p>
                        </div>
                        <p
                          className="w-[180px] truncate text-[14px] tracking-[-0.35px] text-gray-600"
                          title={product.linkUrl}
                        >
                          {product.linkUrl}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {hasNextPage ? (
              <Button
                type="button"
                variant="line"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}
                className="h-16 w-full max-sm:h-11"
              >
                {isFetchingNextPage ? '불러오는 중...' : '더보기'}
              </Button>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}
