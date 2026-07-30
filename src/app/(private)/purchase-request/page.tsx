'use client';

import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import SortDropdown from '@/components/SortDropdown';
import { useMyPurchaseRequests } from '@/features/purchase-request/hooks/useMyPurchaseRequests';
import type { PurchaseRequestStatus } from '@/features/purchase-request/types/purchase-request.types';

const STATUS_BADGE = {
  PENDING: { variant: 'pending', label: '대기 중' },
  APPROVED: { variant: 'approved', label: '승인' },
  REJECTED: { variant: 'rejected', label: '거절' },
  CANCELED: { variant: 'rejected', label: '취소' },
  REFUNDED: { variant: 'rejected', label: '환불' },
} as const;

function formatDate(date: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
}

function formatProductName(productNames: string[]) {
  if (productNames.length === 0) {
    return '상품 정보 없음';
  }

  if (productNames.length === 1) {
    return productNames[0];
  }

  return `${productNames[0]} 외 ${productNames.length - 1}건`;
}

function getStatusBadge(status: PurchaseRequestStatus) {
  return STATUS_BADGE[status];
}

export default function PurchaseRequestPage() {
  const page = 1;
  const pageSize = 10;

  const { data, isLoading, isError } = useMyPurchaseRequests(page, pageSize);

  const requests = data?.purchaseRequests ?? [];

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-[18px] px-6 pb-20 pt-20 max-lg:gap-10 max-lg:pt-[60px] max-sm:gap-0 max-sm:pt-10">
        <div className="relative flex w-full items-center justify-between">
          <h1 className="text-[18px] font-bold tracking-[-0.45px] text-black max-sm:text-[16px] max-sm:tracking-[-0.4px]">
            구매 요청 내역
          </h1>
          <SortDropdown />
        </div>

        <div className="flex w-full flex-col items-end gap-[30px] max-sm:gap-5">
          {/* PC / Tablet table */}
          <div className="flex w-full min-w-[696px] items-center gap-20 border-y border-solid border-gray-100 px-10 py-5 max-lg:justify-between max-lg:gap-0 max-lg:px-0 max-sm:hidden">
            <span className="w-[180px] shrink-0 font-bold text-gray-500 max-lg:w-[100px]">
              구매 요청일
            </span>
            <span className="w-[260px] shrink-0 font-bold text-gray-500 max-lg:w-[140px]">
              상품 정보
            </span>
            <span className="w-[180px] shrink-0 font-bold text-gray-500 max-lg:w-[100px]">
              주문 금액
            </span>
            <span className="w-[180px] shrink-0 font-bold text-gray-500 max-lg:w-[100px]">
              상태
            </span>
            <span className="w-[180px] shrink-0 font-bold text-gray-500 max-lg:w-[126px]">
              비고
            </span>
          </div>
          <ul className="flex w-full min-w-[696px] flex-col max-sm:hidden">
            {isLoading && (
              <li className="py-20 text-center text-gray-500">
                구매 요청 내역을 불러오는 중입니다.
              </li>
            )}

            {isError && (
              <li className="py-20 text-center text-red">
                구매 요청 내역을 불러오지 못했습니다.
              </li>
            )}

            {!isLoading && !isError && requests.length === 0 && (
              <li className="py-20 text-center text-gray-500">
                구매 요청 내역이 없습니다.
              </li>
            )}

            {requests.map((request) => {
              const badge = getStatusBadge(request.status);
              const productNames = request.items.map(
                (item) => item.productName
              );

              return (
                <li
                  key={request.id}
                  className="flex h-[100px] w-full items-center gap-20 border-b border-solid border-gray-100 px-10 max-lg:justify-between max-lg:gap-0 max-lg:px-0"
                >
                  <span className="w-[180px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[100px]">
                    {formatDate(request.requestedAt)}
                  </span>

                  <span className="w-[260px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[140px]">
                    {formatProductName(productNames)}
                  </span>

                  <span className="w-[180px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[100px]">
                    {request.totalAmount.toLocaleString()}원
                  </span>

                  <div className="flex w-[180px] shrink-0 flex-col items-start max-lg:w-[100px]">
                    <Badge variant={badge.variant}>{badge.label}</Badge>
                  </div>

                  <div className="flex w-[126px] shrink-0 flex-col items-start">
                    {request.status === 'PENDING' ? (
                      <Button variant="sub" className="w-full">
                        요청 취소
                      </Button>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Mobile card list */}
          <ul className="hidden w-full flex-col max-sm:flex">
            {isLoading && (
              <li className="py-20 text-center text-gray-500">
                구매 요청 내역을 불러오는 중입니다.
              </li>
            )}

            {isError && (
              <li className="py-20 text-center text-red">
                구매 요청 내역을 불러오지 못했습니다.
              </li>
            )}

            {!isLoading && !isError && requests.length === 0 && (
              <li className="py-20 text-center text-gray-500">
                구매 요청 내역이 없습니다.
              </li>
            )}
            {!isLoading &&
              !isError &&
              requests.map((request) => {
                const badge = getStatusBadge(request.status);
                const productNames = request.items.map(
                  (item) => item.productName
                );

                return (
                  <li
                    key={request.id}
                    className="flex w-full flex-col gap-5 border-b border-solid border-gray-100 py-[30px]"
                  >
                    <div className="flex w-full flex-col gap-2.5">
                      <div className="flex w-full items-center justify-between">
                        <span className="text-[14px] font-bold tracking-[-0.35px] text-gray-950">
                          {formatDate(request.requestedAt)}
                        </span>

                        <Badge variant={badge.variant}>{badge.label}</Badge>
                      </div>

                      <div className="flex flex-col gap-2 text-[14px] tracking-[-0.35px] text-gray-950">
                        <p>{formatProductName(productNames)}</p>
                        <p>{request.totalAmount.toLocaleString()}원</p>
                      </div>
                    </div>

                    {request.status === 'PENDING' ? (
                      <Button variant="sub" size="sm" className="w-full">
                        요청 취소
                      </Button>
                    ) : null}
                  </li>
                );
              })}
          </ul>

          <Pagination />
        </div>
      </main>
    </div>
  );
}
