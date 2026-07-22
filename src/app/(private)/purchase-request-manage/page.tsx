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
    requesterName: '김스낵',
    requesterInitials: 'JN',
  },
  {
    id: 2,
    date: '2024. 07. 04',
    product: '코카콜라 제로 외 1건',
    productName: '코카콜라 제로',
    amount: '1,900',
    status: 'pending',
    requesterName: '김스낵',
    requesterInitials: 'JN',
  },
  {
    id: 3,
    date: '2024. 07. 04',
    product: '코카콜라 제로 외 1건',
    productName: '코카콜라 제로',
    amount: '1,900',
    status: 'pending',
    requesterName: '김스낵',
    requesterInitials: 'JN',
  },
  {
    id: 4,
    date: '2024. 07. 04',
    product: '코카콜라 제로 외 1건',
    productName: '코카콜라 제로',
    amount: '1,900',
    status: 'pending',
    requesterName: '김스낵',
    requesterInitials: 'JN',
  },
  {
    id: 5,
    date: '2024. 07. 04',
    product: '코카콜라 제로 외 1건',
    productName: '코카콜라 제로',
    amount: '1,900',
    status: 'pending',
    requesterName: '김스낵',
    requesterInitials: 'JN',
  },
  {
    id: 6,
    date: '2024. 07. 04',
    product: '코카콜라 제로 외 1건',
    productName: '코카콜라 제로',
    amount: '1,900',
    status: 'pending',
    requesterName: '김스낵',
    requesterInitials: 'JN',
  },
];

export default function PurchaseRequestManagePage() {
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
              {REQUESTS.map((request) => (
                <li
                  key={request.id}
                  className="flex h-[100px] w-full items-center gap-20 border-b border-solid border-gray-100 px-10 max-lg:justify-between max-lg:gap-0 max-lg:px-0"
                >
                  <span className="w-[142px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[100px]">
                    {request.date}
                  </span>
                  <span className="w-[360px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[140px]">
                    {request.product}
                  </span>
                  <span className="w-[142px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-[100px]">
                    {request.amount}
                  </span>
                  <div className="flex w-[134px] shrink-0 items-center gap-3 max-lg:w-[108px]">
                    <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50 text-[10px] tracking-[-0.25px] text-black">
                      {request.requesterInitials}
                    </span>
                    <span className="w-[90px] text-[16px] tracking-[-0.4px] text-gray-950 max-lg:w-16">
                      {request.requesterName}
                    </span>
                  </div>
                  <div className="flex w-[180px] shrink-0 items-center gap-2 max-lg:w-[168px]">
                    <Button variant="sub" className="w-20">
                      반려
                    </Button>
                    <Button variant="filled" size="sm" className="w-20">
                      승인
                    </Button>
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
                className="flex w-full flex-col gap-5 border-b border-solid border-gray-100 py-6"
              >
                <div className="flex w-full flex-col gap-2.5">
                  <div className="flex w-full items-center justify-between pr-1">
                    <span className="text-[14px] font-bold tracking-[-0.35px] text-gray-950">
                      {request.date}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50 text-[10px] tracking-[-0.25px] text-black">
                        {request.requesterInitials}
                      </span>
                      <span className="text-[14px] tracking-[-0.35px] text-gray-950">
                        {request.requesterName}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[14px] tracking-[-0.35px] text-gray-950">
                      {request.product}
                    </p>
                    <p className="text-[20px] font-extrabold tracking-[-0.5px] text-gray-950">
                      {request.amount}원
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

          <Pagination />
        </div>
      </main>
    </div>
  );
}
