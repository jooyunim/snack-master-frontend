'use client';

import Button from '@/components/Button';
import RequestItemsSection, {
  type RequestItem,
} from '@/components/RequestItemsSection';
import InfoSection from '../../../../components/InfoSection';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useMyPurchaseRequest } from '@/features/purchase-request/hooks/useMyPurchaseRequest';

function formatPrice(price: number) {
  return `${price.toLocaleString('ko-KR')}원`;
}

function formatDate(date: string | null) {
  if (!date) {
    return '-';
  }

  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Seoul',
  }).format(new Date(date));
}

export default function PurchaseRequestDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const purchaseRequestId = Number(params.id);

  const { data, isLoading, isError } = useMyPurchaseRequest(purchaseRequestId);

  const STATUS_LABEL = {
    PENDING: '대기 중',
    APPROVED: '승인',
    REJECTED: '반려',
    CANCELED: '취소',
    REFUNDED: '환불',
  } as const;

  if (!Number.isInteger(purchaseRequestId) || purchaseRequestId < 1) {
    notFound();
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">
          구매 요청 상세 정보를 불러오는 중입니다.
        </p>
      </div>
    );
  }

  if (isError || !data) {
    notFound();
  }

  const isRefunded = data.resolutionInfo.status === 'REFUNDED';

  const detailItems: readonly RequestItem[] = data.items.map((item) => ({
    id: item.id,
    name: item.productName,
    price: formatPrice(item.price),
    quantity: `수량 ${item.quantity}개`,
    totalPrice: formatPrice(item.lineTotal),
    imageSrc: item.imageUrl,
  }));

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-[30px] px-6 pb-20 pt-[60px] max-lg:pt-[30px] max-sm:pb-[136px]">
        <h1 className="w-full text-[18px] font-bold tracking-[-0.45px] text-gray-950">
          구매 요청 내역
        </h1>

        <RequestItemsSection
          itemCount={data.summary.itemCount}
          items={detailItems}
          orderAmount={formatPrice(data.summary.productAmount)}
          shippingFee={formatPrice(data.summary.shippingFee)}
          totalAmount={formatPrice(data.summary.totalAmount)}
          showChevron
        />

        <InfoSection
          title="요청 정보"
          rows={[
            {
              type: 'pair',
              left: {
                label: '요청인',
                value: data.requestInfo.requester.name,
              },
              right: {
                label: '요청 날짜',
                value: formatDate(data.requestInfo.requestedAt),
              },
            },
            {
              type: 'single',
              field: {
                label: '요청 메시지',
                value: data.requestInfo.message ?? '-',
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
                  ? (data.resolutionInfo.refundedBy?.name ?? '-')
                  : (data.resolutionInfo.resolver?.name ?? '-'),
              },
              right: {
                label: isRefunded ? '환불 날짜' : '승인 날짜',
                value: formatDate(
                  isRefunded
                    ? (data.resolutionInfo.refundedAt ?? null)
                    : data.resolutionInfo.resolvedAt
                ),
              },
            },
            {
              type: 'pair',
              left: {
                label: '상태',
                value: STATUS_LABEL[data.resolutionInfo.status], // REFUNDED → '환불'
              },
              right: {
                label: isRefunded ? '환불 사유' : '결과 메시지',
                value: isRefunded
                  ? data.resolutionInfo.refundReason?.trim() || '-'
                  : (data.resolutionInfo.message ?? '-'),
              },
            },
          ]}
        />

        <div className="mx-auto flex h-16 w-full max-w-[616px] items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:h-auto max-sm:max-w-none max-sm:gap-4 max-sm:bg-white max-sm:p-6">
          <Button
            type="button"
            variant="line"
            className="min-w-0 flex-1"
            onClick={() => router.push('/purchase-request')}
          >
            목록 보기
          </Button>
          <div className="w-[300px] shrink-0 max-sm:w-auto max-sm:flex-1 max-sm:shrink">
            <Button variant="filled" className="w-full">
              <span className="max-sm:hidden">장바구니에 다시 담기</span>
              <span className="hidden max-sm:inline">장바구니 다시 담기</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
