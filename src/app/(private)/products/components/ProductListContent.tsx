import ProductGrid from '@/app/(private)/products/components/ProductGrid';
import ProductListHeader from '@/app/(private)/products/components/ProductListHeader';
import {
  findCategory,
  findSubCategory,
} from '@/app/(private)/products/constants/categories';
import { filterProducts } from '@/app/(private)/products/constants/products';

type ProductListContentProps = {
  categorySlug?: string;
  subSlug?: string;
};

export default function ProductListContent({
  categorySlug,
  subSlug,
}: ProductListContentProps) {
  const category = categorySlug ? findCategory(categorySlug) : undefined;
  const sub =
    categorySlug && subSlug
      ? findSubCategory(categorySlug, subSlug)
      : undefined;
  const products = filterProducts(categorySlug, subSlug);

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-[30px] max-sm:px-6 max-sm:gap-5">
      <ProductListHeader
        categoryLabel={category?.label}
        subLabel={sub?.label}
      />
      <ProductGrid products={products} />
    </section>
  );
}
