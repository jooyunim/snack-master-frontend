'use client';

import { useMemo } from 'react';
import WishlistGrid from '@/app/(private)/wishlist/components/WishlistGrid';
import WishlistHeader from '@/app/(private)/wishlist/components/WishlistHeader';
import { useWishlist } from '@/features/wishlist/hooks/useWishlist';

export default function WishlistContent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useWishlist();

  const products = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data],
  );

  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-[30px] px-6 pb-20 pt-20 max-lg:pt-[60px] max-sm:gap-5 max-sm:pt-10">
      <WishlistHeader />
      <WishlistGrid
        products={products}
        hasNext={hasNextPage}
        isFetchingNext={isFetchingNextPage}
        onLoadMore={() => fetchNextPage()}
      />
    </section>
  );
}
