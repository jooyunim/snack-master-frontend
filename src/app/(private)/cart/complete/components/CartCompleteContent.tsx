'use client';

import { useAuth } from '@/contexts/AuthContext';
import CartStepIndicator, {
  type CartFlow,
} from '@/app/(private)/cart/components/CartStepIndicator';
import PurchaseCompleteContent from './PurchaseCompleteContent';
import RequestCompleteContent from './RequestCompleteContent';
import type { RequestItem } from '@/components/RequestItemsSection';
import { useMyPurchaseRequest } from '@/features/cart/hooks/useMyPurchaseRequest';
import { redirect } from 'next/navigation';

const formatPrice = (value: number) => `${value.toLocaleString('ko-KR')}원`;

type CartCompleteContentProps = {
  purchaseRequestId: number;
};

export default function CartCompleteContent({
  purchaseRequestId,
}: CartCompleteContentProps) {
  const { user, isAuthChecked } = useAuth();

  const cartFlow: CartFlow = user?.role === 'USER' ? 'request' : 'purchase';
  const currentStep = 3;

  // ADMIN 구매(POST /cart/purchase)도 PurchaseRequest를 만들고 requesterId가 본인이라
  // request와 동일하게 GET /purchase-requests/mine/:id 로 조회 가능
  const { data, isLoading, isError } = useMyPurchaseRequest(
    purchaseRequestId,
    isAuthChecked
  );

  if (!isAuthChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-[16px] tracking-[-0.4px] text-gray-600">
          로딩 중...
        </p>
      </div>
    );
  }

  if (isError) {
    redirect('/cart');
  }

  const completeItems: RequestItem[] =
    data?.items.map((item) => ({
      id: item.id,
      name: item.productName,
      unitPrice: formatPrice(item.price),
      quantity: `수량 ${item.quantity}개`,
      totalPrice: formatPrice(item.lineTotal),
      imageSrc: item.imageUrl,
    })) ?? [];

  const paidAmountWithoutReward = data
    ? Math.max(
        data.summary.totalAmount -
          data.summary.shippingFee -
          data.summary.pointsUsed,
        0
      )
    : 0;
  const reward = Math.floor(paidAmountWithoutReward * 0.01);

  const paidAmount = data
    ? data.summary.totalAmount - data.summary.pointsUsed
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <main
        className={`mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 pb-20 pt-20 max-lg:pt-[60px] max-sm:px-[25px] max-sm:pb-[136px] max-sm:pt-10 ${
          cartFlow === 'purchase'
            ? 'gap-[70px] max-sm:gap-10'
            : 'gap-[60px] max-sm:gap-10'
        }`}
      >
        <CartStepIndicator flow={cartFlow} currentStep={currentStep} />
        {isLoading || !data ? (
          <p className="text-[16px] tracking-[-0.4px] text-gray-600">
            {cartFlow === 'purchase'
              ? '구매 내역을 불러오는 중...'
              : '요청 내역을 불러오는 중...'}
          </p>
        ) : cartFlow === 'purchase' ? (
          <PurchaseCompleteContent
            items={completeItems}
            orderAmount={formatPrice(data.summary.productAmount)}
            shippingFee={formatPrice(data.summary.shippingFee)}
            totalAmount={formatPrice(data.summary.totalAmount)}
            pointsUsed={data.summary.pointsUsed.toString()}
            reward={reward.toString()}
            paidAmount={formatPrice(paidAmount)}
          />
        ) : (
          <RequestCompleteContent
            items={completeItems}
            orderAmount={formatPrice(data.summary.productAmount)}
            shippingFee={formatPrice(data.summary.shippingFee)}
            totalAmount={formatPrice(data.summary.totalAmount)}
            requestMessage={data.requestInfo.message}
          />
        )}
      </main>
    </div>
  );
}
