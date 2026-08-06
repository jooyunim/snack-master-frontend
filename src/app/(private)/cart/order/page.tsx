import { redirect } from 'next/navigation';
import CartOrderContent from './components/CartOrderContent';

type CartOrderPageProps = {
  searchParams: Promise<{ cartItemIds?: string }>;
};

export default async function CartOrderPage({
  searchParams,
}: CartOrderPageProps) {
  const { cartItemIds } = await searchParams;

  const selectedIds = [
    ...new Set(
      cartItemIds
        ?.split(',')
        .map(Number)
        .filter((id) => Number.isSafeInteger(id) && id > 0) ?? []
    ),
  ];

  if (selectedIds.length === 0) {
    redirect('/cart');
  }

  return <CartOrderContent selectedIds={selectedIds} />;
}
