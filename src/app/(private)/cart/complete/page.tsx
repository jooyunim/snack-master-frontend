import { redirect } from 'next/navigation';
import CartCompleteContent from './components/CartCompleteContent';

type CartCompletePageProps = {
  searchParams: Promise<{ id?: string }>;
};

export default async function CartCompletePage({
  searchParams,
}: CartCompletePageProps) {
  const { id } = await searchParams;
  const purchaseRequestId = Number(id);
  const hasValidId =
    Number.isInteger(purchaseRequestId) && purchaseRequestId > 0;

  if (!hasValidId) {
    redirect('/cart');
  }

  return <CartCompleteContent purchaseRequestId={purchaseRequestId} />;
}
