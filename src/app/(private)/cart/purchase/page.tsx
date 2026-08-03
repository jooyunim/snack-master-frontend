import { redirect } from 'next/navigation';
import CartPurchaseContent from './components/CartPurchaseContent';

type CartPurchasePageProps = {
  searchParams: Promise<{ cartItemIds?: string }>;
};

export default async function CartPurchasePage({
  searchParams,
}: CartPurchasePageProps) {
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

  return <CartPurchaseContent selectedIds={selectedIds} />;
}
