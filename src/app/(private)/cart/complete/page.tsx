'use client';

import { useAuth } from '@/contexts/AuthContext';
import CartStepIndicator, {
  type CartFlow,
} from '@/app/(private)/cart/components/CartStepIndicator';
import PurchaseCompleteContent from './components/PurchaseCompleteContent';
import RequestCompleteContent from './components/RequestCompleteContent';
import type { RequestItem } from '@/components/RequestItemsSection';
import { useMyPurchaseRequest } from '@/features/cart/hooks/useMyPurchaseRequest';
import { redirect, useSearchParams } from 'next/navigation';

const formatPrice = (value: number) => `${value.toLocaleString('ko-KR')}원`;

export default function CartCompletePage() {
  const { user, isAuthChecked } = useAuth();
  const searchParams = useSearchParams();

  const cartFlow: CartFlow = user?.role === 'USER' ? 'request' : 'purchase';
  const currentStep = 3;

  // 쿼리 id로 구매(요청) 상세 조회 — request/purchase 모두 동일 API
  const purchaseRequestId = Number(searchParams.get('id'));
  const hasValidId =
    Number.isInteger(purchaseRequestId) && purchaseRequestId > 0;

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

  if (!hasValidId || isError) {
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
    ? data.summary.totalAmount -
      data.summary.shippingFee -
      data.summary.pointsUsed
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
