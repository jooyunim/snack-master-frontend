import { notFound } from 'next/navigation';
import ProductDetailContent from '@/app/(private)/products/[id]/components/ProductDetailContent';
import { getProductById } from '@/app/(private)/products/constants/products';

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

  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}
