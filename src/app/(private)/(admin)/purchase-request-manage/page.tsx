"use client"
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import SortDropdown from '@/components/SortDropdown';
import { useRequestList } from '@/features/purchase-request-manage/hooks/useRequestList';
import { ModalState, sortByOption } from '@/features/purchase-request-manage/types/purchase-request-manage.type';
import { useState } from 'react';
import PurchaseRequestModal from './components/PurchaseRequestModal';



export default function PurchaseRequestManagePage() {

  const [sortBy, setsortBy] = useState<sortByOption>('recent')
  const [modalState, setModalState] = useState<ModalState | null>(null)
  const { data, isPending, isError } = useRequestList(sortBy)

  if (isPending) return <div>로딩 중...</div>
  if (isError) return <div>에러남</div>

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 pb-20 pt-20 max-lg:gap-5 max-lg:pt-[60px] max-sm:gap-3 max-sm:pt-10">
        <div className="relative flex w-full items-center justify-between">
          <h1 className="text-[18px] font-bold tracking-[-0.45px] text-black max-sm:text-[16px] max-sm:tracking-[-0.4px]">
            구매 요청 관리
          </h1>
          <SortDropdown />
        </div>

        <div className="flex w-full flex-col items-end gap-[30px] max-sm:gap-5">
          {/* PC / Tablet table */}
          <div className="flex w-full flex-col overflow-x-auto max-sm:hidden">
            <div className="flex w-full min-w-[1100px] items-center gap-20 border-y border-solid border-gray-100 px-10 py-5 max-lg:min-w-[696px] max-lg:justify-between max-lg:gap-0 max-lg:px-0">
              <span className="w-[142px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[100px]">
                구매 요청일
              </span>
              <span className="w-[360px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[140px]">
                상품 정보
              </span>
              <span className="w-[142px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[100px]">
                주문 금액
              </span>
              <span className="w-[134px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[108px]">
                요청인
              </span>
              <span className="w-[180px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[168px]">
                비고
              </span>
            </div>


            <ul className="flex w-full min-w-[1100px] flex-col max-lg:min-w-[696px]">
              {data.map((request) => (
                <li
                  key={request.id}
                  className="flex h-[100px] w-full items-center gap-20 border-b border-solid border-gray-100 px-10 max-lg:justify-between max-lg:gap-0 max-lg:px-0"
                >
                  <span className="w-[142px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[100px]">
                    {request.requestedAt}
                  </span>
                  <span className="w-[360px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[140px]">
                    {request.itemSummary}
                  </span>
                  <span className="w-[142px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[100px]">
                    {request.totalAmount}
                  </span>
                  <div className="flex w-[134px] shrink-0 items-center gap-3 max-lg:w-[108px]">
                    <span className="w-[90px] text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-16">
                      {request.requesterName}
                    </span>
                  </div>
                  <div className="flex w-[180px] shrink-0 items-center gap-2 max-lg:w-[168px]">
                    <Button variant="sub" className="w-20" onClick={() => setModalState({ requestId: request.id, action: 'reject' })}>
                      반려
                    </Button>
                    <Button variant="filled" size="sm" className="w-20" onClick={() => setModalState({ requestId: request.id, action: 'approve' })}>
                      승인
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile card list */}
          <ul className="hidden w-full flex-col max-sm:flex">
            {data.map((request) => (
              <li
                key={request.id}
                className="flex w-full flex-col gap-5 border-b border-solid border-gray-100 py-6"
              >
                <div className="flex w-full flex-col gap-2.5">
                  <div className="flex w-full items-center justify-between pr-1">
                    <span className="text-[14px] font-bold tracking-[-0.35px] text-gray-950">
                      {request.requestedAt}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14px] tracking-[-0.35px] text-gray-950">
                        {request.requesterName}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[14px] tracking-[-0.35px] text-gray-950">
                      {request.itemSummary}
                    </p>
                    <p className="text-[20px] font-extrabold tracking-[-0.5px] text-gray-950">
                      {request.totalAmount}원
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center gap-2">
                  <Button variant="sub" className="min-w-0 flex-1">
                    반려
                  </Button>
                  <Button variant="filled" size="sm" className="min-w-0 flex-1">
                    승인
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          {modalState && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"> <PurchaseRequestModal requestId={modalState.requestId} mode={modalState.action} onclose={() => setModalState(null)} /></div>}
          <Pagination />
        </div>
      </main>
    </div>
  );
}
