'use client';

import Pagination from '@/components/Pagination';
import SortDropdown, { SortOption } from '@/components/SortDropdown';
import { useRequestList } from '@/features/purchase-request-manage/hooks/useRequestList';
import {
  ModalState,
  sortByOption,
} from '@/features/purchase-request-manage/types/purchase-request-manage.type';
import { useState } from 'react';
import PurchaseRequestModal from './components/PurchaseRequestModal';
import EmptyState from '@/components/EmptyState';
import { useRouter } from 'next/navigation';
import RequestTable from './components/RequestTable';

const SORT_OPTIONS: SortOption[] = [
  { label: '최신순', value: 'recent' },
  { label: '낮은 가격순', value: 'price_asc' },
  { label: '높은 가격순', value: 'price_desc' },
];

export default function PurchaseRequestManagePage() {
  const router = useRouter();

  const [sortBy, setsortBy] = useState<sortByOption>('recent');
  const [page, setPage] = useState(1);
  const [modalState, setModalState] = useState<ModalState | null>(null);
  const { data, isPending, isError } = useRequestList(sortBy, page);

  const requests = data?.items ?? [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 pb-20 pt-20 max-lg:gap-5 max-lg:pt-[60px] max-sm:gap-3 max-sm:pt-10">
        <div className="relative flex w-full items-center justify-between">
          <h1 className="text-[18px] font-bold tracking-[-0.45px] text-black max-sm:text-[16px] max-sm:tracking-[-0.4px]">
            구매 요청 관리
          </h1>
          <SortDropdown
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={(value) => setsortBy(value as sortByOption)}
          />
        </div>

        {isPending ? (
          <div>로딩 중...</div>
        ) : isError ? (
          <div>에러가 발생했습니다.</div>
        ) : requests.length === 0 ? (
          <EmptyState
            title="요청 내역이 없어요"
            description="상품 리스트를 둘러보고 상품을 담아보세요"
            buttonLabel="상품 리스트로 이동"
            onButtonClick={() => {
              router.push('/products');
            }}
          />
        ) : (
          <div className="flex w-full flex-col items-end gap-[30px] max-sm:gap-5">
            {/* PC / Tablet table */}
            <RequestTable
              requests={requests}
              onReject={(id) =>
                setModalState({ action: 'reject', requestId: id })
              }
              onApprove={(id) =>
                setModalState({ action: 'approve', requestId: id })
              }
            />

            {pagination && pagination.totalPage > 1 && (
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPage}
                onPageChange={setPage}
              />
            )}
          </div>
        )}

        {modalState && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <PurchaseRequestModal
              requestId={modalState.requestId}
              mode={modalState.action}
              onclose={() => setModalState(null)}
            />
          </div>
        )}
      </main>
    </div>
  );
}
