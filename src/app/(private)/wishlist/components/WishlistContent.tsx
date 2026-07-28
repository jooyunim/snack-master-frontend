'use client';

import WishlistGrid from '@/app/(private)/wishlist/components/WishlistGrid';
import WishlistHeader from '@/app/(private)/wishlist/components/WishlistHeader';
import { WISHLIST_PRODUCTS } from '@/app/(private)/wishlist/constants/wishlist';

export default function WishlistContent() {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-[30px] px-6 pb-20 pt-20 max-lg:pt-[60px] max-sm:gap-5 max-sm:pt-10">
      <WishlistHeader />
      <WishlistGrid products={WISHLIST_PRODUCTS} />
    </section>
  );
}
