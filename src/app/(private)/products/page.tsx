import ProductListContent from '@/app/(private)/products/components/ProductListContent';

type ProductsPageProps = {
  searchParams: Promise<{ category?: string; sub?: string; sort?: string }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  return (
    <ProductListContent
      categorySlug={params.category}
      subSlug={params.sub}
      sortParam={params.sort}
    />
  );
}
