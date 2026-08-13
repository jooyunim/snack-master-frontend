import { notFound } from 'next/navigation';
import ProductDetailContent from '@/app/(private)/products/[id]/components/ProductDetailContent';

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isFinite(productId)) {
    notFound();
  }

  return <ProductDetailContent productId={productId} />;
}
