import Link from 'next/link';
import Button from '@/components/Button';
import CartStepIndicator from '../components/CartStepIndicator';
import RequestItemsSection from '../components/RequestItemsSection';
import RequestMessage from '../components/RequestMessage';

const ORDER_ITEMS = [
  {
    id: 1,
    name: '코카콜라 제로',
    unitPrice: '2,000원',
    quantity: '수량 4개',
    totalPrice: '26,000원',
    imageSrc: '/images/coke-zero.png',
  },
  {
    id: 2,
    name: '코카콜라 제로',
    unitPrice: '2,000원',
    quantity: '수량 4개',
    totalPrice: '26,000원',
    imageSrc: '/images/coke-zero.png',
  },
] as const;

export default function CartOrderPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-[50px] px-6 pb-20 pt-20 max-lg:pt-[60px] max-sm:gap-10 max-sm:px-[25px] max-sm:pb-[136px] max-sm:pt-10">
        <CartStepIndicator flow="request" currentStep={2} />

        <div className="flex w-full flex-col gap-10">
          <RequestItemsSection
            itemCount={2}
            items={ORDER_ITEMS}
            orderAmount="52,000원"
            shippingFee="3,000원"
            totalAmount="55,000원"
          />
          <RequestMessage />
        </div>

        <div className="flex h-16 w-full max-w-[616px] items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:h-auto max-sm:max-w-none max-sm:gap-4 max-sm:bg-white max-sm:p-6">
          <Button variant="line" className="min-w-0 flex-1">
            취소
          </Button>
          <Link
            href="/cart/order/complete"
            className="w-[300px] shrink-0 max-sm:w-auto max-sm:flex-1 max-sm:shrink"
          >
            <Button variant="filled" className="w-full">
              구매 요청
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
