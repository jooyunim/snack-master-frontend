'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Pagination from '@/components/Pagination';
import SortDropdown, { SortOption } from '@/components/SortDropdown';
import EmptyState from '@/components/EmptyState';
import { CardListSkeleton, TableSkeleton } from '@/components/TableRowSkeleton';
import PurchaseRequestModal from './components/PurchaseRequestModal';
import RequestTable from './components/RequestTable';
import { useRequestList } from '@/features/purchase-request-manage/hooks/useRequestList';
import {
  ModalState,
  sortByOption,
} from '@/features/purchase-request-manage/types/purchase-request-manage.type';
import { useQueryPagination } from '@/hooks/useQueryPagination';
import Button from '@/components/Button';
import icSearch from '@/assets/icons/ic_search.svg';
import Image from 'next/image';

const SORT_OPTIONS: SortOption[] = [
  { label: '최신순', value: 'recent' },
  { label: '낮은 가격순', value: 'price_asc' },
  { label: '높은 가격순', value: 'price_desc' },
];

const REQUEST_MANAGE_TABLE_COLUMNS = [
  {
    className: 'w-[142px] shrink-0 max-lg:w-[100px]',
    bars: [{ className: 'h-4 w-28 max-lg:w-20' }],
  },
  {
    className: 'w-[360px] shrink-0 max-lg:w-[140px]',
    bars: [{ className: 'h-4 w-48 max-lg:w-24' }],
  },
  {
    className: 'w-[142px] shrink-0 max-lg:w-[100px]',
    bars: [{ className: 'h-4 w-24 max-lg:w-16' }],
  },
  {
    className: 'w-[134px] shrink-0 gap-3 max-lg:w-[108px]',
    bars: [
      { className: 'size-8 shrink-0 rounded-full' },
      { className: 'h-4 w-[90px] max-lg:w-16' },
    ],
  },
  {
    className: 'w-[180px] shrink-0 gap-2 max-lg:w-[168px]',
    bars: [
      { className: 'h-9 w-20 rounded-[2px]' },
      { className: 'h-9 w-20 rounded-[2px]' },
    ],
  },
];

export default function PurchaseRequestManagePage() {
  const router = useRouter();
  const { page, setPage, sort, setSort, search, setSearch } =
    useQueryPagination();
  const [modalState, setModalState] = useState<ModalState | null>(null);
  const [searchInput, setSearchInput] = useState(search);
  const [prevSearch, setPrevSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setSearchInput(search);
  }

  const sortBy = SORT_OPTIONS.some((option) => option.value === sort)
    ? (sort as sortByOption)
    : 'recent';

  const {
    data: requestList,
    isPending,
    isError,
  } = useRequestList(sortBy, page, search);
  const handleSearchSubmit = () => {
    setSearch(searchInput);
  };

  const requests = requestList?.items ?? [];
  const pagination = requestList?.pagination;

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 pb-20 pt-20 max-lg:gap-5 max-lg:pt-[60px] max-sm:gap-3 max-sm:pt-10">
        <div className="relative flex w-full items-center justify-between max-sm:flex-col max-sm:items-stretch max-sm:gap-3">
          <h1 className="text-[18px] font-bold tracking-[-0.45px] text-black max-sm:text-[16px] max-sm:tracking-[-0.4px]">
            구매 요청 관리
          </h1>

          <div className="flex items-center gap-4 max-sm:flex-col max-sm:items-stretch">
            <form
              className="flex h-11 items-center gap-2 border-b border-gray-300 px-1"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchSubmit();
              }}
            >
              <label htmlFor="requester-search" className="sr-only">
                요청인 이름 검색
              </label>
              <span
                aria-hidden="true"
                className="relative size-4 shrink-0 overflow-hidden"
              >
                <Image src={icSearch} alt="" fill className="object-contain" />
              </span>
              <input
                id="requester-search"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="요청인 이름 검색"
                className="min-w-0 bg-transparent text-[14px] tracking-[-0.35px] text-gray-950 outline-none placeholder:text-gray-400"
              />
              <Button
                type="submit"
                variant="line"
                size="sm"
                className="h-8 px-2 text-[12px]"
              >
                검색
              </Button>
            </form>

            <SortDropdown
              options={SORT_OPTIONS}
              value={sortBy}
              onChange={(value) => {
                setSort(value);
              }}
            />
          </div>
        </div>
        {isPending ? (
          <div
            className="flex w-full flex-col items-end gap-[30px] max-sm:gap-5"
            aria-busy="true"
            aria-label="구매 요청 목록 로딩 중"
          >
            <div className="flex w-full flex-col">
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
                  <TableSkeleton
                    rows={10}
                    columns={REQUEST_MANAGE_TABLE_COLUMNS}
                    className="gap-20 px-10 max-lg:justify-between max-lg:gap-0 max-lg:px-0"
                  />
                </ul>
              </div>
              <ul className="hidden w-full flex-col max-sm:flex">
                <CardListSkeleton rows={5} lines={2} className="gap-5 py-6" />
              </ul>
            </div>
          </div>
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
            <RequestTable
              requests={requests}
              onReject={(id) =>
                setModalState({ action: 'reject', requestId: id })
              }
              onApprove={(id) =>
                setModalState({ action: 'approve', requestId: id })
              }
            />
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
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
              onClose={() => setModalState(null)}
            />
          </div>
        )}
      </main>
    </div>
  );
}
