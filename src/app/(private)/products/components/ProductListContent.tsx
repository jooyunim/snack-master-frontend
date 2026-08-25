'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import ProductGrid from '@/app/(private)/products/components/ProductGrid';
import ProductListHeader from '@/app/(private)/products/components/ProductListHeader';
import ProductModal from '@/app/(private)/products/components/ProductModal';
import { useProducts } from '@/features/product/hooks/useProducts';
import type {
  CategoryWithChildren,
  CursorPage,
  Product,
  ProductSort,
} from '@/features/product/types/product.types';

type ProductListContentProps = {
  categorySlug?: string;
  subSlug?: string;
  sortParam?: string;
  searchParam?: string;
  categories?: CategoryWithChildren[];
  initialProducts?: CursorPage<Product>;
};

const PRODUCT_SORTS: ProductSort[] = [
  'recent',
  'sales',
  'priceAsc',
  'priceDesc',
];

export default function ProductListContent({
  categorySlug,
  subSlug,
  sortParam,
  searchParam,
  categories,
  initialProducts,
}: ProductListContentProps) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = PRODUCT_SORTS.includes(sortParam as ProductSort)
    ? (sortParam as ProductSort)
    : 'recent';

  const category = categorySlug
    ? categories?.find((item) => item.slug === categorySlug)
    : undefined;
  const sub = subSlug
    ? category?.children.find((child) => child.slug === subSlug)
    : undefined;

  const categoryId = sub?.id ?? category?.id;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useProducts(
    {
      categoryId,
      search: searchParam?.trim() || undefined,
      sort,
      limit: 12,
    },
    initialProducts
  );

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data]
  );

  const handleSortChange = (nextSort: ProductSort) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextSort === 'recent') {
      params.delete('sort');
    } else {
      params.set('sort', nextSort);
    }
    router.replace(`${pathname}${params.size ? `?${params}` : ''}`);
  };

  const handleSearchSubmit = (search: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const normalizedSearch = search.trim();
    if (normalizedSearch) {
      params.set('q', normalizedSearch);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}${params.size ? `?${params}` : ''}`);
  };

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-[30px] max-sm:px-6 max-sm:gap-5">
      <h1 className="sr-only">상품 목록</h1>
      <ProductListHeader
        categoryLabel={category?.name}
        subLabel={sub?.name}
        sort={sort}
        search={searchParam}
        onSortChange={handleSortChange}
        onSearchSubmit={handleSearchSubmit}
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
