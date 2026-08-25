import ProductListContent from '@/app/(private)/products/components/ProductListContent';
import {
  getCategoriesServer,
  getProductsServer,
} from '@/features/product/services/product.server-api';

type ProductsPageProps = {
  searchParams: Promise<{
    category?: string;
    sub?: string;
    sort?: string;
    q?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const categories = await getCategoriesServer();
  const category = params.category
    ? categories.find((item) => item.slug === params.category)
    : undefined;
  const sub = params.sub
    ? category?.children.find((child) => child.slug === params.sub)
    : undefined;
  const initialProducts = await getProductsServer({
    categoryId: sub?.id ?? category?.id,
    search: params.q?.trim() || undefined,
    sort:
      params.sort === 'sales' ||
      params.sort === 'priceAsc' ||
      params.sort === 'priceDesc'
        ? params.sort
        : 'recent',
    limit: 12,
  });

  return (
    <ProductListContent
      categorySlug={params.category}
      subSlug={params.sub}
      sortParam={params.sort}
      searchParam={params.q}
      categories={categories}
      initialProducts={initialProducts}
    />
  );
}
