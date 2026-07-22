import ProductListContent from '@/app/(private)/products/components/ProductListContent';

type ProductsPageProps = {
  searchParams: Promise<{ category?: string; sub?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const category = params.category ?? 'drink';
  const sub = params.sub ?? (category === 'drink' ? 'soda' : undefined);

  return <ProductListContent categorySlug={category} subSlug={sub} />;
}
