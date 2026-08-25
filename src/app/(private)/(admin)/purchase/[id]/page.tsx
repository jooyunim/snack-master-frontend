'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import RequestItemsSection, {
  type RequestItem,
} from '@/components/RequestItemsSection';
import icChevronUp from '@/assets/icons/ic_chevron_up.svg';
import Image from 'next/image';
import InfoSection from '@/components/InfoSection';
import type { OrderDetail } from '@/features/purchase/types/purchase.types';
import { formatDate, formatWon, statusLabel } from '@/features/purchase/format';
import PurchaseDetailLoading from '../components/PurchaseDetailLoading';
import PurchaseDetailError from '../components/PurchaseDetailError';
import PaymentSummary from '@/components/PaymentSummary';
import { useOrderDetail } from '@/features/purchase/hooks/useOrderDetail';
import Button from '@/components/Button';

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

export default function PurchaseDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const orderId = Number(params.id);
  const isValidId = Number.isInteger(orderId) && orderId >= 1;

  const { data: order, isLoading, isError } = useOrderDetail(orderId);

  const items = useMemo(() => (order ? toRequestItems(order) : []), [order]);
  const [itemsOpen, setItemsOpen] = useState(true);

  if (!isValidId) {
    return <PurchaseDetailError message="유효하지 않은 구매 내역입니다." />;
  }

  if (isLoading || (order != null && order.id !== orderId)) {
    return <PurchaseDetailLoading />;
  }

  if (isError || !order) {
    return <PurchaseDetailError message="구매 내역을 불러오지 못했습니다." />;
  }

  const itemTotal = calcItemTotal(order);
  const totalQuantity = calcTotalQuantity(order);

  const isApproved = order.status === 'APPROVED';
  const isRefunded = order.status === 'REFUNDED';

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-[30px] px-6 pb-20 pt-[60px] max-lg:pt-[30px]">
        <h1 className="w-full text-[18px] font-bold tracking-[-0.45px] text-gray-950">
          구매 내역 상세
        </h1>
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
        <div className="flex w-full flex-col gap-5">
          <PaymentSummary
            variant="order"
            pointsUsed={order.pointsUsed ?? 0}
            pointsEarned={order.pointsEarned ?? 0}
            paidAmount={order.paidAmount ?? 0}
          />

          {isRefunded ? (
            <PaymentSummary
              variant="refund"
              pointsUsed={order.pointsUsed ?? 0}
              pointsEarned={order.pointsEarned ?? 0}
              paidAmount={order.paidAmount ?? 0}
            />
          ) : null}
        </div>

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

        <InfoSection
          title={isRefunded ? '환불 정보' : '승인 정보'}
          rows={[
            {
              type: 'pair',
              left: {
                label: '담당자',
                value: isRefunded
                  ? (order.refundedBy?.name ?? '-')
                  : (order.resolver?.name ?? '-'),
              },
              right: {
                label: isRefunded ? '환불 날짜' : '승인 날짜',
                value: formatDate(
                  isRefunded ? (order.refundedAt ?? null) : order.resolvedAt
                ),
              },
            },
            {
              type: 'pair',
              left: { label: '상태', value: statusLabel(order.status) },
              right: {
                label: isRefunded ? '환불 사유' : '결과 메시지', // 라벨도 바꾸려면
                value: isRefunded
                  ? order.refundReason?.trim() || '-'
                  : order.resultMessage?.trim() || '-',
              },
            },
          ]}
        />

        <div className="mx-auto flex h-16 w-full max-w-[616px] items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:h-auto max-sm:max-w-none max-sm:gap-4 max-sm:bg-white max-sm:p-6">
          {isApproved && (
            <>
              <Button
                variant="line"
                className="min-w-0 flex-1"
                onClick={() => router.push(`/purchase/${order.id}/refund`)}
              >
                환불하기
              </Button>
              <div className="w-[300px] shrink-0 max-sm:w-auto max-sm:flex-1">
                <Button
                  variant="filled"
                  className="w-full"
                  onClick={() => router.back()}
                >
                  목록으로
                </Button>
              </div>
            </>
          )}

          {isRefunded && (
            <div className="mx-auto w-full max-w-[300px]">
              <Button
                variant="filled"
                className="w-full"
                onClick={() => router.back()}
              >
                목록으로
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
