"use client"
import AlertModal from '@/components/AlertModal';
import Button from '@/components/Button';
import InfoSection from '@/components/InfoSection';
import icAlert from '@/assets/icons/ic_!.svg';


import RequestItemsSection from '@/components/RequestItemsSection';
import { useRequestDetail } from '@/features/purchase-request-manage/hooks/useRequestDetail';
import { useRequestMutations } from '@/features/purchase-request-manage/hooks/useRequestMutation';
import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Toast from '@/components/Toast';



export default function PurchaseRequestManageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const requestId = Number(id)
  const { data, isPending, isError } = useRequestDetail(requestId)
  const { patchApproveMutation } = useRequestMutations()
  const { patchRejectMutation } = useRequestMutations()
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showAlert, setShowAlert] = useState(true)


  const router = useRouter()
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }
  const isOverBudget = showAlert && data?.isOverBudget
  if (isPending) return (
    <div>로딩중...</div>
  )

  if (isError) return (
    <div>에러...</div>
  )
  const handleApprove = () => {
    patchApproveMutation.mutate({ id: requestId, resultMessage: "" }, {
      onSuccess: () => {
        setShowApproveModal(true)

      },
      onError: () => {
        alert('에러가 발생했습니다.');
      }
    })
  }
  const handleReject = () => {
    patchRejectMutation.mutate({ id: requestId, resultMessage: "" }, {
      onSuccess: () => {
        setShowRejectModal(true)
      },
      onError: () => {
        alert('에러가 발생했습니다.');
      }
    })
  }
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col gap-[30px] px-6 pb-20 pt-[60px] max-lg:pt-[30px] max-sm:pb-[136px]">
        <h1 className="w-full text-[18px] font-bold tracking-[-0.45px] text-gray-950">
          구매 요청 상세
        </h1>
        {isOverBudget && <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-[1152px]">
          <Toast
            onClose={() => setShowAlert(false)}
            remainingBudget={data.remained.toLocaleString()}
          />
        </div>
        }
        <RequestItemsSection
          itemCount={data.items.length}
          items={data.items}
          orderAmount={data.orderAmount}
          shippingFee={data.shippingFee}
          totalAmount={data.requestAmount}
          showChevron={true}
        />

        <InfoSection
          title="요청 정보"
          rows={[
            {
              type: 'pair',
              left: { label: '요청인', value: data.requesterName },
              right: { label: '요청 날짜', value: formatDate(data.requestedAt) },
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
        {showApproveModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[5px]"><AlertModal icon={icAlert} confirmLabel='구매내역 보기' onCancel={() => router.push('/')} onConfirm={() => router.push('/purchase')} /></div>}
        {showRejectModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[5px]"><AlertModal icon={icAlert} title='요청 반려' content={`요청이 반려되었어요\n목록에서 다른 요청을 확인해보세요`} confirmLabel='구매요청내역 보기' onCancel={() => router.push('/')} onConfirm={() => router.push('/purchase-request-manage')} /></div>}
        <InfoSection
          title="예산 정보"
          rows={[
            {
              type: 'single',
              field: { label: '이번 달 지출액', value: data.thisMonthSpent.toLocaleString() + '원' },
            },
            {
              type: 'single',
              field: { label: '이번 달 남은 예산', value: data.remained.toLocaleString() + '원' },
            },
            {
              type: 'single',
              field: { label: '구매 후 예산', value: data.afterBudget.toLocaleString() + '원' },
            },
          ]}
        />

        <div className="mx-auto flex h-16 w-full max-w-[616px] items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:h-auto max-sm:max-w-none max-sm:gap-4 max-sm:bg-white max-sm:p-6">
          <Button variant="line" className="min-w-0 flex-1" onClick={handleReject}>
            요청 반려
          </Button>
          <div className="w-[300px] shrink-0 max-sm:w-auto max-sm:flex-1 max-sm:shrink">
            <Button variant="filled" className="w-full" onClick={handleApprove} disabled={data?.isOverBudget}>
              요청 승인
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
