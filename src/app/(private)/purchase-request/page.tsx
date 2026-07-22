import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import SortDropdown from '@/components/SortDropdown';
import type { PurchaseRequest } from '@/features/purchase-request/types/purchase-request.types';

const REQUESTS: PurchaseRequest[] = [
  {
    id: 1,
    date: '2024. 07. 04',
    product: '코카콜라 제로 외 1건',
    productName: '코카콜라 제로',
    amount: '1,900',
    status: 'pending',
  },
  {
    id: 2,
    date: '2024. 07. 04',
    product: '코카콜라 제로 외 1건',
    productName: '코카콜라 제로',
    amount: '1,900',
    status: 'pending',
  },
  {
    id: 3,
    date: '2024. 07. 04',
    product: '코카콜라 제로 외 1건',
    productName: '코카콜라 제로',
    amount: '1,900',
    status: 'approved',
  },
  {
    id: 4,
    date: '2024. 07. 04',
    product: '코카콜라 제로 외 1건',
    productName: '코카콜라 제로',
    amount: '1,900',
    status: 'rejected',
  },
  {
    id: 5,
    date: '2024. 07. 04',
    product: '코카콜라 제로 외 1건',
    productName: '코카콜라 제로',
    amount: '1,900',
    status: 'approved',
  },
  {
    id: 6,
    date: '2024. 07. 04',
    product: '코카콜라 제로 외 1건',
    productName: '코카콜라 제로',
    amount: '1,900',
    status: 'approved',
  },
];

export default function PurchaseRequestPage() {
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
          <div className="flex w-full flex-col overflow-x-auto max-sm:hidden">
            <div className="flex w-full min-w-[696px] items-center gap-20 border-y border-solid border-gray-100 px-10 py-5 max-lg:justify-between max-lg:gap-0 max-lg:px-0">
              <span className="w-[180px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[100px]">
                구매 요청일
              </span>
              <span className="w-[260px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[140px]">
                상품 정보
              </span>
              <span className="w-[180px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[100px]">
                주문 금액
              </span>
              <span className="w-[180px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[100px]">
                상태
              </span>
              <span className="w-[180px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500 max-lg:w-[126px]">
                비고
              </span>
            </div>

            <ul className="flex w-full min-w-[696px] flex-col">
              {REQUESTS.map((request) => (
                <li
                  key={request.id}
                  className="flex h-[100px] w-full items-center gap-20 border-b border-solid border-gray-100 px-10 max-lg:justify-between max-lg:gap-0 max-lg:px-0"
                >
                  <span className="w-[180px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[100px]">
                    {request.date}
                  </span>
                  <span className="w-[260px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[140px]">
                    {request.product}
                  </span>
                  <span className="w-[180px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[100px]">
                    {request.amount}
                  </span>
                  <div className="flex w-[180px] shrink-0 flex-col items-start max-lg:w-[100px]">
                    <Badge variant={request.status} />
                  </div>
                  <div className="flex w-[126px] shrink-0 flex-col items-start">
                    {request.status === 'pending' ? (
                      <Button variant="sub" className="w-full">
                        요청 취소
                      </Button>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile card list */}
          <ul className="hidden w-full flex-col max-sm:flex">
            {REQUESTS.map((request) => (
              <li
                key={request.id}
                className="flex w-full flex-col gap-5 border-b border-solid border-gray-100 py-[30px]"
              >
                <div className="flex w-full flex-col gap-2.5">
                  <div className="flex w-full items-center justify-between">
                    <span className="text-[14px] font-bold tracking-[-0.35px] text-gray-950">
                      {request.date}
                    </span>
                    <Badge variant={request.status} />
                  </div>
                  <div className="flex flex-col gap-2 text-[14px] tracking-[-0.35px] text-gray-950">
                    <p>{request.productName}</p>
                    <p>{request.amount}원</p>
                  </div>
                </div>
                {request.status === 'pending' ? (
                  <Button variant="sub" size="sm" className="w-full">
                    요청 취소
                  </Button>
                ) : null}
              </li>
            ))}
          </ul>

          <Pagination />
        </div>
      </main>
    </div>
  );
}
