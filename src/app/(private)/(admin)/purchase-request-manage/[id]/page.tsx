'use client';

import AlertModal from '@/components/AlertModal';
import Button from '@/components/Button';
import InfoSection from '@/components/InfoSection';
import icAlert from '@/assets/icons/ic_!.svg';
import PointCalculate from '@/app/(private)/(admin)/purchase-request-manage/utils/PointCalculate';
import RequestItemsSection, {
  RequestItem,
} from '@/components/RequestItemsSection';
import { useRequestDetail } from '@/features/purchase-request-manage/hooks/useRequestDetail';
import { useRequestMutations } from '@/features/purchase-request-manage/hooks/useRequestMutation';
import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/Toast';
import { usePoints } from '@/features/cart/hooks/usePoints';
import { ApiError } from '@/lib/api';

export default function PurchaseRequestManageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const parsedRequestId = Number(id);
  const requestId =
    Number.isSafeInteger(parsedRequestId) && parsedRequestId > 0
      ? parsedRequestId
      : null;

  const { data, isPending, isError } = useRequestDetail(requestId);
  const { patchApproveMutation, patchRejectMutation } = useRequestMutations();
  const [resultModal, setResultModal] = useState<'approve' | 'reject' | null>(
    null
  );
  const [showAlert, setShowAlert] = useState(true);
  const [pointAmount, setPointAmount] = useState(0);
  const [resultMessage, setResultMessage] = useState('');
  const { data: balancePointData } = usePoints();
  const pointBalance = balancePointData?.balancePointAmount ?? 0;
  const router = useRouter();

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }

  const isMutating =
    patchApproveMutation.isPending || patchRejectMutation.isPending;

  if (requestId === null) {
    return <div>잘못된 구매 요청입니다.</div>;
  }

  if (isPending) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const mappedItems: RequestItem[] = data.items.map((item) => ({
    id: item.id,
    name: item.productName,
    price: `${item.price.toLocaleString()}원`,
    quantity: `수량 ${item.quantity}개`,
    totalPrice: `${item.totalPrice.toLocaleString()}원`,
    imageSrc: item.imageUrl ?? '',
  }));

  const {
    maxPoint,
    safePointAmount,
    previewPaidAmount,
    previewReward,
    previewAfterBudget,
    isOverBudgetAfterPoints,
  } = PointCalculate({
    pointBalance,
    pointAmount,
    requestAmount: data.requestAmount,
    shippingFee: data.shippingFee,
    remainedBudget: data.remained,
  });

  const isOverBudget = showAlert && isOverBudgetAfterPoints;

  const handleApprove = () => {
    patchApproveMutation.mutate(
      { id: requestId, resultMessage, requestPointAmount: safePointAmount },
      {
        onSuccess: () => {
          setResultModal('approve');
        },
        onError: (error) => {
          alert(
            error instanceof ApiError ? error.message : '에러가 발생했습니다.'
          );
        },
      }
    );
  };

  const handleReject = () => {
    patchRejectMutation.mutate(
      { id: requestId, resultMessage },
      {
        onSuccess: () => {
          setResultModal('reject');
        },
        onError: (error) => {
          alert(
            error instanceof ApiError ? error.message : '에러가 발생했습니다.'
          );
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-[30px] px-6 pb-20 pt-[60px] max-lg:pt-[30px] max-sm:pb-[136px]">
        <h1 className="w-full text-[18px] font-bold tracking-[-0.45px] text-gray-950">
          구매 요청 상세
        </h1>

        {isOverBudget && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-[1152px]">
            <Toast
              onClose={() => setShowAlert(false)}
              remainingBudget={data.remained.toLocaleString()}
            />
          </div>
        )}

        <RequestItemsSection
          itemCount={mappedItems.length}
          items={mappedItems}
          orderAmount={`${data.orderAmount.toLocaleString()}원`}
          shippingFee={`${data.shippingFee.toLocaleString()}원`}
          totalAmount={`${data.requestAmount.toLocaleString()}원`}
          showChevron={true}
        />

        <section className="flex w-full flex-col gap-3 rounded-[2px] bg-white p-6 shadow-[0_0_5px_rgba(0,0,0,0.12)]">
          <div className="flex w-full items-center justify-end gap-2">
            <label htmlFor="pointInput" className="sr-only">
              사용 포인트
            </label>
            <input
              id="pointInput"
              type="number"
              min={0}
              max={maxPoint}
              value={pointAmount}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === '') {
                  setPointAmount(0);
                  return;
                }
                const num = Number(raw);
                if (Number.isNaN(num)) return;
                setPointAmount(Math.min(Math.max(num, 0), maxPoint));
              }}
              className="w-24 rounded border border-gray-300 bg-transparent px-2 py-1 text-right text-[14px] outline-none focus:border-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="text-[16px] font-bold text-gray-600">
              {`/ ${maxPoint.toLocaleString()} P`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1 text-[16px] font-bold text-gray-700">
            <p>적립 예정: {previewReward.toLocaleString()} P</p>
            <p className="text-[20px] font-extrabold text-black">
              실결제액: {previewPaidAmount.toLocaleString()}원
            </p>
          </div>
        </section>

        <section className="flex w-full flex-col gap-3">
          <label
            htmlFor="processMessageInput"
            className="text-[16px] font-bold tracking-[-0.4px] text-gray-950"
          >
            처리 메시지
          </label>
          <textarea
            id="processMessageInput"
            placeholder="승인/반려 메시지를 입력해주세요"
            className="h-[140px] w-full resize-none rounded-[2px] border border-solid border-gray-200 bg-white p-6 text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-950 outline-none placeholder:text-gray-400"
            value={resultMessage}
            onChange={(e) => setResultMessage(e.target.value)}
          />
        </section>

        <InfoSection
          title="요청 정보"
          rows={[
            {
              type: 'pair',
              left: { label: '요청인', value: data.requesterName },
              right: {
                label: '요청 날짜',
                value: formatDate(data.requestedAt),
              },
            },
            {
              type: 'single',
              field: {
                label: '요청 메시지',
                value: data.requestMessage,
              },
            },
          ]}
        />

        {resultModal === 'approve' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[5px]">
            <AlertModal
              icon={icAlert}
              title="요청 승인 완료"
              content="구매 요청이 성공적으로 승인되었습니다."
              confirmLabel="구매내역 보기"
              onCancel={() => router.push('/')}
              onConfirm={() => router.push('/purchase')}
            />
          </div>
        )}

        {resultModal === 'reject' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[5px]">
            <AlertModal
              icon={icAlert}
              title="요청 반려"
              content={`요청이 반려되었어요\n목록에서 다른 요청을 확인해보세요`}
              confirmLabel="구매요청내역 보기"
              onCancel={() => router.push('/')}
              onConfirm={() => router.push('/purchase-request-manage')}
            />
          </div>
        )}

        <InfoSection
          title="예산 정보"
          rows={[
            {
              type: 'single',
              field: {
                label: '이번 달 지출액',
                value: data.thisMonthSpent.toLocaleString() + '원',
              },
            },
            {
              type: 'single',
              field: {
                label: '이번 달 남은 예산',
                value: data.remained.toLocaleString() + '원',
              },
            },
            {
              type: 'single',
              field: {
                label: '구매 후 예산',
                value: previewAfterBudget.toLocaleString() + '원',
              },
            },
          ]}
        />

        <div className="mx-auto flex h-16 w-full max-w-[616px] items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:h-auto max-sm:max-w-none max-sm:gap-4 max-sm:bg-white max-sm:p-6">
          <Button
            variant="line"
            className="min-w-0 flex-1 cursor-pointer"
            onClick={handleReject}
            disabled={isMutating}
          >
            요청 반려
          </Button>
          <div className="w-[300px] shrink-0 max-sm:w-auto max-sm:flex-1 max-sm:shrink">
            <Button
              variant="filled"
              className="w-full cursor-pointer"
              onClick={handleApprove}
              disabled={isOverBudgetAfterPoints || isMutating}
            >
              요청 승인
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
