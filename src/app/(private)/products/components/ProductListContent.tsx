'use client';

import { useMemo, useState } from 'react';
import ProductGrid from '@/app/(private)/products/components/ProductGrid';
import ProductListHeader from '@/app/(private)/products/components/ProductListHeader';
import ProductModal from '@/app/(private)/products/components/ProductModal';
import { useCategories } from '@/features/product/hooks/useCategories';
import { useProducts } from '@/features/product/hooks/useProducts';

type ProductListContentProps = {
  categorySlug?: string;
  subSlug?: string;
};

export default function ProductListContent({
  categorySlug,
  subSlug,
}: ProductListContentProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { data: categories } = useCategories();

  const category = categorySlug
    ? categories?.find((item) => item.slug === categorySlug)
    : undefined;
  const sub = subSlug
    ? category?.children.find((child) => child.slug === subSlug)
    : undefined;

  // 소분류가 선택되면 그 id로, 대분류만 선택되면 대분류 id로(BE가 하위 전체 포함 조회)
  const categoryId = sub?.id ?? category?.id;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts({
    categoryId,
    limit: 12, // 한 번에 가져올 상품 수
  });

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data],
  );

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-[30px] max-sm:px-6 max-sm:gap-5">
      <ProductListHeader
        categoryLabel={category?.name}
        subLabel={sub?.name}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />
      <ProductGrid
        products={products}
        hasNext={Boolean(hasNextPage)}
        isFetchingNext={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
      />

      {isRegisterOpen ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 p-6 max-sm:items-end max-sm:p-0">
          <ProductModal onClose={() => setIsRegisterOpen(false)} />
        </div>
      ) : null}
    </section>
  );
}
