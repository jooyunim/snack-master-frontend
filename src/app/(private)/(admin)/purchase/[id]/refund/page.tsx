'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import RequestItemsSection, {
  type RequestItem,
} from '@/components/RequestItemsSection';
import InfoSection from '@/components/InfoSection';
import PaymentSummary from '@/components/PaymentSummary';
import Button from '@/components/Button';
import AlertModal from '@/components/AlertModal';
import icChevronUp from '@/assets/icons/ic_chevron_up.svg';
import icAlert from '@/assets/icons/ic_!.svg';
import { ApiError } from '@/lib/api';
import type { OrderDetail } from '@/features/purchase/types/purchase.types';
import { formatDate, formatWon } from '@/features/purchase/format';
import { useOrderDetail } from '@/features/purchase/hooks/useOrderDetail';
import { useRefundOrder } from '@/features/purchase/hooks/useRefundOrder';
import PurchaseDetailLoading from '../../components/PurchaseDetailLoading';
import PurchaseDetailError from '../../components/PurchaseDetailError';

function toRequestItems(order: OrderDetail): RequestItem[] {
  return order.items.map((item) => ({
    id: item.id,
    name: item.productName,
    price: formatWon(item.price),
    quantity: `수량 ${item.quantity}개`,
    totalPrice: formatWon(item.price * item.quantity),
    imageSrc: item.imageUrl,
  }));
}

function calcItemTotal(order: OrderDetail) {
  return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calcTotalQuantity(order: OrderDetail) {
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
}

export default function PurchaseRefundPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const orderId = Number(params.id);
  const isValidId = Number.isInteger(orderId) && orderId >= 1;

  const { data: order, isLoading, isError } = useOrderDetail(orderId);
  const refundMutation = useRefundOrder();

  const [itemsOpen, setItemsOpen] = useState(true);
  const [refundReason, setRefundReason] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const items = useMemo(() => (order ? toRequestItems(order) : []), [order]);

  if (!isValidId) {
    return <PurchaseDetailError message="유효하지 않은 구매 내역입니다." />;
  }

  if (isLoading || (order != null && order.id !== orderId)) {
    return <PurchaseDetailLoading />;
  }

  if (isError || !order) {
    return <PurchaseDetailError message="구매 내역을 불러오지 못했습니다." />;
  }

  if (order.status !== 'APPROVED') {
    return (
      <PurchaseDetailError message="승인 완료 상태인 구매만 환불할 수 있습니다." />
    );
  }

  const itemTotal = calcItemTotal(order);
  const totalQuantity = calcTotalQuantity(order);

  const handleRefund = () => {
    const reason = refundReason.trim();
    if (!reason) {
      setErrorMessage('환불 사유를 입력해주세요.');
      return;
    }

    refundMutation.mutate(
      { id: orderId, refundReason: reason },
      {
        onSuccess: () => setSuccessOpen(true),
        onError: (error) => {
          // 적립 회수 잔액 부족 등 → 백엔드 400 message
          setErrorMessage(
            error instanceof ApiError
              ? error.message
              : '환불 처리 중 오류가 발생했습니다.'
          );
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-[30px] px-6 pb-20 pt-[60px] max-lg:pt-[30px]">
        <h1 className="w-full text-[18px] font-bold tracking-[-0.45px] text-gray-950">
          환불
        </h1>

        {/* 구매 품목 */}
        <div className="flex w-full flex-col gap-5">
          <button
            type="button"
            onClick={() => setItemsOpen((prev) => !prev)}
            aria-expanded={itemsOpen}
            className="flex items-center gap-1.5 text-left text-[16px] tracking-[-0.4px] text-gray-950"
          >
            <span className="font-bold">구매 품목</span>
            <span>총 {totalQuantity}개</span>
            <span className="relative size-5 shrink-0 overflow-hidden">
              <Image
                src={icChevronUp}
                alt=""
                fill
                className={`object-contain transition-transform ${
                  itemsOpen ? '' : 'rotate-180'
                }`}
              />
            </span>
          </button>

          {itemsOpen ? (
            <div className="[&>section>:first-child]:hidden">
              <RequestItemsSection
                sectionTitle="구매 품목"
                itemCount={totalQuantity}
                items={items}
                orderAmount={formatWon(itemTotal)}
                shippingFee={formatWon(order.shippingFee)}
                totalAmount={formatWon(order.totalAmount)}
              />
            </div>
          ) : null}
        </div>

        <PaymentSummary
          pointsUsed={order.pointsUsed ?? 0}
          pointsEarned={order.pointsEarned ?? 0}
          paidAmount={order.paidAmount ?? 0}
        />

        <InfoSection
          title="요청 정보"
          rows={[
            {
              type: 'pair',
              left: { label: '요청인', value: order.requester.name },
              right: {
                label: '요청 날짜',
                value: formatDate(order.requestedAt),
              },
            },
            {
              type: 'single',
              field: {
                label: '요청 메시지',
                value: order.requestMessage?.trim() || '-',
              },
            },
          ]}
        />

        {/* 환불 사유 */}
        <section className="flex w-full flex-col gap-2">
          <label
            htmlFor="refundReason"
            className="text-[16px] font-bold tracking-[-0.4px] text-gray-950"
          >
            환불 사유
          </label>
          <textarea
            id="refundReason"
            value={refundReason}
            onChange={(e) => setRefundReason(e.target.value)}
            placeholder="환불 사유를 입력해주세요"
            maxLength={500}
            className="h-[140px] w-full resize-none rounded-[2px] border border-solid border-gray-200 bg-white p-6 text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-950 outline-none placeholder:text-gray-400"
          />
        </section>

        {/* 버튼: 취소(흰) / 환불하기(검정) */}
        <div className="mx-auto flex h-16 w-full max-w-[616px] items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:h-auto max-sm:max-w-none max-sm:gap-4 max-sm:bg-white max-sm:p-6">
          <Button
            variant="line"
            className="min-w-0 flex-1"
            onClick={() => router.push(`/purchase/${orderId}`)}
            disabled={refundMutation.isPending}
          >
            취소
          </Button>
          <div className="w-[300px] shrink-0 max-sm:w-auto max-sm:flex-1 max-sm:shrink">
            <Button
              variant="filled"
              className="w-full"
              onClick={handleRefund}
              disabled={refundMutation.isPending}
            >
              환불하기
            </Button>
          </div>
        </div>
      </main>

      {/* 환불 완료 모달 */}
      {successOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[5px]">
          <AlertModal
            icon={icAlert}
            title="환불 완료"
            content={`환불이 완료되었어요!\n구매 내역에서 상태를 확인해보세요`}
            cancelLabel="홈으로"
            confirmLabel="구매 내역 보기"
            onCancel={() => router.push('/')}
            onConfirm={() => router.push('/purchase')}
          />
        </div>
      ) : null}

      {/* 적립 회수 잔액 부족 등 실패 모달 */}
      {errorMessage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[5px]">
          <AlertModal
            icon={icAlert}
            title="환불 불가"
            content={errorMessage}
            showCancel={false}
            confirmLabel="확인"
            onConfirm={() => setErrorMessage(null)}
          />
        </div>
      ) : null}
    </div>
  );
}
