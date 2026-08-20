'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Pagination from '@/components/Pagination';
import SortDropdown from '@/components/SortDropdown';
import type {
  OrderListItem,
  OrderSort,
} from '@/features/purchase/types/purchase.types';
import {
  formatAmount,
  formatDate,
  formatProductName,
} from '@/features/purchase/format';
import BudgetSummaryCards from './components/BudgetSummaryCards';
import { useRouter } from 'next/navigation';
import EmptyState from '@/components/EmptyState';
import { useOrders } from '@/features/purchase/hooks/useOrders';
import { useDashboardSummary } from '@/features/purchase/hooks/useDashboardSummary';
import { useQueryPagination } from '@/features/member/hooks/useQueryPagination';

type PurchaseRow = {
  id: number;
  requestDate: string;
  requester: string;
  product: string;
  quantity: string;
  quantityCompact: string;
  amount: string;
  approvedDate: string;
  manager: string;
};

function toRow(item: OrderListItem): PurchaseRow {
  return {
    id: item.id,
    requestDate: formatDate(item.requestedAt),
    requester: item.requesterName,
    product: formatProductName(item.items),
    quantity: `총 수량 ${item.totalQuantity}개`,
    quantityCompact: `총수량 ${item.totalQuantity}개`,
    amount: formatAmount(item.totalAmount),
    approvedDate: formatDate(item.resolvedAt),
    manager: item.resolverName ?? '-',
  };
}

export default function PurchasePage() {
  const { page, setPage, sort: sortParam, setSort } = useQueryPagination();
  const sort = ['latest', 'amountAsc', 'amountDesc'].includes(sortParam)
    ? (sortParam as OrderSort)
    : 'latest';
  const pageSize = 10;
  const router = useRouter();

  const { data: summary } = useDashboardSummary();
  const { data, isLoading, isError } = useOrders({ page, pageSize, sort });

  const rows = useMemo(() => (data?.orders ?? []).map(toRow), [data?.orders]);
  const total = data?.total ?? 0;
  const isEmpty = !isLoading && !isError && rows.length === 0;
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / pageSize)),
    [total]
  );

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 pb-20 pt-20 max-lg:gap-[30px] max-lg:pt-[60px] max-sm:gap-4 max-sm:pt-10">
        <div className="relative flex w-full items-center justify-between">
          <h1 className="text-[18px] font-bold tracking-[-0.45px] text-gray-950">
            구매 내역 확인
          </h1>
          <SortDropdown
            options={[
              { label: '최신순', value: 'latest' },
              { label: '낮은 가격순', value: 'amountAsc' },
              { label: '높은 가격순', value: 'amountDesc' },
            ]}
            value={sort}
            onChange={handleSortChange}
          />
        </div>

        {isError ? (
          <p className="text-[16px] text-gray-500">
            구매 내역을 불러오지 못했습니다.
          </p>
        ) : (
          <>
            {summary ? <BudgetSummaryCards summary={summary} /> : null}

            {isEmpty ? (
              <EmptyState
                title="구매 내역이 없어요"
                description={'구매 요청을 승인하고\n상품을 주문해보세요'}
                buttonLabel="구매 요청 내역으로 이동"
                onButtonClick={() => router.push('/purchase-request-manage')}
              />
            ) : (
              <>
                {/* PC table */}
                <div className="flex w-full flex-col max-lg:hidden">
                  <div className="flex w-full items-center justify-between border-y border-solid border-gray-100 px-10 py-5">
                    <span className="w-[130px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                      구매 요청일
                    </span>
                    <span className="w-[122px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                      요청인
                    </span>
                    <span className="w-[220px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                      상품 정보
                    </span>
                    <span className="w-[130px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                      주문 금액
                    </span>
                    <span className="w-[130px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                      구매 승인일
                    </span>
                    <span className="w-[100px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
                      담당자
                    </span>
                  </div>

                  <ul className="flex w-full flex-col">
                    {rows.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={`/purchase/${item.id}`}
                          className="flex h-[100px] w-full items-center justify-between border-b border-solid border-gray-100 px-10"
                        >
                          <span className="w-[130px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950">
                            {item.requestDate}
                          </span>
                          <div className="flex w-[122px] shrink-0 items-center gap-2">
                            <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                              {item.requester}
                            </span>
                          </div>
                          <div className="flex w-[220px] shrink-0 flex-col gap-1">
                            <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                              {item.product}
                            </span>
                            {item.quantity ? (
                              <span className="text-[14px] tracking-[-0.35px] text-gray-500">
                                {item.quantity}
                              </span>
                            ) : null}
                          </div>
                          <span className="w-[130px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950">
                            {item.amount}
                          </span>
                          <span className="w-[130px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950">
                            {item.approvedDate}
                          </span>
                          <span className="w-[100px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950">
                            {item.manager}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tablet / Mobile */}
                <ul className="hidden w-full flex-col max-lg:flex max-sm:hidden">
                  {rows.map((item) => (
                    <li
                      key={item.id}
                      className="flex w-full flex-col pb-5 last:pb-0 max-sm:pb-2.5"
                    >
                      <Link
                        href={`/purchase/${item.id}`}
                        className="flex w-full flex-col"
                      >
                        {/* 상단: 상품명 / 수량 / 금액 */}
                        <div className="flex w-full items-center justify-between border-b border-solid border-gray-300 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[16px] font-bold tracking-[-0.4px] text-gray-950">
                              {item.product}
                            </span>
                            {item.quantityCompact ? (
                              <span className="text-[12px] tracking-[-0.3px] text-gray-500">
                                {item.quantityCompact}
                              </span>
                            ) : null}
                          </div>
                          <span className="text-[16px] font-extrabold tracking-[-0.4px] text-gray-950">
                            {item.amount}원
                          </span>
                        </div>

                        {/* 요청일·요청인 / 승인일·담당자 */}
                        <div className="flex w-full flex-col">
                          <div className="flex w-full items-center">
                            <div className="flex min-w-0 flex-1 items-center">
                              <div className="flex h-[50px] w-[140px] shrink-0 items-center border-b border-r border-solid border-gray-100 p-2">
                                <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                                  구매 요청일
                                </span>
                              </div>
                              <div className="flex h-[50px] min-w-0 flex-1 items-center border-b border-r border-solid border-gray-100 px-5 py-2">
                                <span className="text-[16px] font-bold tracking-[-0.4px] text-gray-900">
                                  {item.requestDate}
                                </span>
                              </div>
                            </div>
                            <div className="flex min-w-0 flex-1 items-center">
                              <div className="flex h-[50px] w-[140px] shrink-0 items-center border-b border-r border-solid border-gray-100 px-5 py-2">
                                <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                                  요청인
                                </span>
                              </div>
                              <div className="flex h-[50px] min-w-0 flex-1 items-center border-b border-solid border-gray-100 px-5 py-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-[16px] font-bold tracking-[-0.4px] text-gray-900">
                                    {item.requester}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex w-full items-center">
                            <div className="flex min-w-0 flex-1 items-center">
                              <div className="flex h-[50px] w-[140px] shrink-0 items-center border-b border-r border-solid border-gray-100 p-2">
                                <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                                  구매 승인일
                                </span>
                              </div>
                              <div className="flex h-[50px] min-w-0 flex-1 items-center border-b border-r border-solid border-gray-100 px-5 py-2">
                                <span className="text-[16px] font-bold tracking-[-0.4px] text-gray-900">
                                  {item.approvedDate}
                                </span>
                              </div>
                            </div>
                            <div className="flex min-w-0 flex-1 items-center">
                              <div className="flex h-[50px] w-[140px] shrink-0 items-center border-b border-r border-solid border-gray-100 px-5 py-2">
                                <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                                  담당자
                                </span>
                              </div>
                              <div className="flex h-[50px] min-w-0 flex-1 items-center border-b border-solid border-gray-100 px-5 py-2">
                                <span className="text-[16px] font-bold tracking-[-0.4px] text-gray-900">
                                  {item.manager}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Mobile */}
                <ul className="hidden w-full flex-col max-sm:flex">
                  {rows.map((item) => (
                    <li
                      key={item.id}
                      className="flex w-full flex-col pb-2.5 last:pb-0"
                    >
                      <Link
                        href={`/purchase/${item.id}`}
                        className="flex w-full flex-col"
                      >
                        {/* 상단: 상품명 / 수량 / 금액 */}
                        <div className="flex w-full items-center justify-between border-b border-solid border-gray-300 py-3.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[16px] font-bold tracking-[-0.4px] text-gray-950">
                              {item.product}
                            </span>
                            {item.quantityCompact ? (
                              <span className="text-[12px] tracking-[-0.3px] text-gray-500">
                                {item.quantityCompact}
                              </span>
                            ) : null}
                          </div>
                          <span className="text-[16px] font-extrabold tracking-[-0.4px] text-gray-950">
                            {item.amount}원
                          </span>
                        </div>

                        <div className="flex w-full flex-col">
                          <div className="flex w-full items-center">
                            <div className="flex h-[50px] w-[140px] shrink-0 items-center border-b border-r border-solid border-gray-100 p-2">
                              <span className="text-[14px] tracking-[-0.35px] text-gray-950">
                                구매 요청일
                              </span>
                            </div>
                            <div className="flex h-[50px] min-w-0 flex-1 items-center border-b border-solid border-gray-100 px-4 py-2">
                              <span className="text-[14px] font-bold tracking-[-0.35px] text-gray-900">
                                {item.requestDate}
                              </span>
                            </div>
                          </div>

                          <div className="flex w-full items-center">
                            <div className="flex h-[50px] w-[140px] shrink-0 items-center border-b border-r border-solid border-gray-100 p-2">
                              <span className="text-[14px] tracking-[-0.35px] text-gray-950">
                                요청인
                              </span>
                            </div>
                            <div className="flex h-[50px] min-w-0 flex-1 items-center gap-2 border-b border-solid border-gray-100 px-4 py-2">
                              <span className="text-[14px] font-bold tracking-[-0.35px] text-gray-900">
                                {item.requester}
                              </span>
                            </div>
                          </div>

                          <div className="flex w-full items-start">
                            <div className="flex w-[140px] shrink-0 items-start border-b border-r border-solid border-gray-100 px-2 py-4">
                              <span className="text-[14px] tracking-[-0.35px] text-gray-950">
                                구매 승인일
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 items-start border-b border-solid border-gray-100 p-4">
                              <span className="text-[14px] font-bold tracking-[-0.35px] text-gray-900">
                                {item.approvedDate}
                              </span>
                            </div>
                          </div>

                          <div className="flex w-full items-start">
                            <div className="flex w-[140px] shrink-0 items-start border-b border-r border-solid border-gray-100 px-2 py-4">
                              <span className="text-[14px] tracking-[-0.35px] text-gray-950">
                                담당자
                              </span>
                            </div>
                            <div className="flex min-w-0 flex-1 items-center border-b border-solid border-gray-100 p-4">
                              <span className="text-[14px] font-bold leading-[1.6] tracking-[-0.35px] text-gray-900">
                                {item.manager}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
