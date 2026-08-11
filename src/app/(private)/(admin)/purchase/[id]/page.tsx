'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import RequestItemsSection, {
  type RequestItem,
} from '@/components/RequestItemsSection';
import icChevronUp from '@/assets/icons/ic_chevron_up.svg';
import Image from 'next/image';
import InfoSection from '@/components/InfoSection';
import { getOrderById } from '@/features/purchase/purchase.api';
import type { OrderDetail } from '@/features/purchase/purchase.types';
import { formatDate, formatWon, statusLabel } from '@/features/purchase/format';
import PurchaseDetailLoading from '../components/PurchaseDetailLoading';
import PurchaseDetailError from '../components/PurchaseDetailError';
import PaymentSummary from '@/components/PaymentSummary';

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
  const orderId = Number(params.id);
  const isValidId = Number.isInteger(orderId) && orderId >= 1;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const items = useMemo(() => (order ? toRequestItems(order) : []), [order]);
  const [itemsOpen, setItemsOpen] = useState(true);

  useEffect(() => {
    if (!isValidId) return;

    let cancelled = false;

    getOrderById(orderId)
      .then((data) => {
        if (cancelled) return;

        if (data.id !== orderId) {
          setOrder(null);
          setError('구매 내역을 불러오지 못했습니다.');
          setLoading(false);
          return;
        }

        setOrder(data);
        setError(null);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setOrder(null);
        setError('구매 내역을 불러오지 못했습니다.');
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [orderId, isValidId]);

  if (!isValidId) {
    return <PurchaseDetailError message="유효하지 않은 구매 내역입니다." />;
  }

  if (
    loading ||
    (!order && !error) ||
    (order !== null && order.id !== orderId)
  ) {
    return <PurchaseDetailLoading />;
  }

  if (error) {
    return <PurchaseDetailError message={error} />;
  }

  if (!order) {
    return <PurchaseDetailLoading />;
  }

  const itemTotal = calcItemTotal(order);
  const totalQuantity = calcTotalQuantity(order);

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

        <PaymentSummary
          pointsUsed={`${(order.pointsUsed ?? 0).toLocaleString('ko-KR')} P`}
          pointsEarned={`${(order.pointsEarned ?? 0).toLocaleString('ko-KR')} P`}
          paidAmount={formatWon(order.paidAmount)}
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

        <InfoSection
          title="승인 정보"
          rows={[
            {
              type: 'pair',
              left: {
                label: '담당자',
                value: order.resolver?.name ?? '-',
              },
              right: {
                label: '승인 날짜',
                value: formatDate(order.resolvedAt),
              },
            },
            {
              type: 'pair',
              left: { label: '상태', value: statusLabel(order.status) },
              right: {
                label: '결과 메시지',
                value: order.resultMessage?.trim() || '-',
              },
            },
          ]}
        />
      </main>
    </div>
  );
}
