import Badge from '@/components/Badge';
import Pagination from '@/components/Pagination';
import SortDropdown from '@/components/SortDropdown';
import BudgetSummaryCards from './components/BudgetSummaryCards';
import PurchaseEmptyState from './components/PurchaseEmptyState';

type Purchase = {
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

const PURCHASES: Purchase[] = [];

export default function PurchasePage() {
  const isEmpty = PURCHASES.length === 0;

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-6 pb-20 pt-20 max-lg:gap-[30px] max-lg:pt-[60px] max-sm:gap-4 max-sm:pt-10">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-[18px] font-bold tracking-[-0.45px] text-gray-950">
            구매 내역 확인
          </h1>
          <SortDropdown />
        </div>

        <BudgetSummaryCards />

        {isEmpty ? (
          <PurchaseEmptyState />
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
                <span className="w-[180px] shrink-0 text-[16px] font-bold tracking-[-0.4px] text-gray-500">
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
                {PURCHASES.map((item) => (
                  <li
                    key={item.id}
                    className="flex h-[100px] w-full items-center justify-between border-b border-solid border-gray-100 px-10"
                  >
                    <span className="w-[130px] shrink-0 text-[16px] tracking-[-0.4px] text-gray-950">
                      {item.requestDate}
                    </span>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                        {item.requester}
                      </span>
                      <Badge />
                    </div>
                    <div className="flex w-[180px] shrink-0 flex-col gap-1">
                      <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                        {item.product}
                      </span>
                      <span className="text-[14px] tracking-[-0.35px] text-gray-500">
                        {item.quantity}
                      </span>
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
                  </li>
                ))}
              </ul>
            </div>

            {/* Tablet / Mobile list */}
            <ul className="hidden w-full flex-col max-lg:flex">
              {PURCHASES.map((item) => (
                <li
                  key={item.id}
                  className="flex w-full flex-col pb-5 last:pb-0 max-sm:pb-2.5 max-sm:last:pb-0"
                >
                  <div className="flex w-full items-center justify-between border-b border-solid border-gray-300 py-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[16px] font-bold tracking-[-0.4px] text-gray-950">
                        {item.product}
                      </span>
                      <span className="text-[12px] tracking-[-0.3px] text-gray-500">
                        {item.quantityCompact}
                      </span>
                    </div>
                    <span className="text-[16px] font-extrabold tracking-[-0.4px] text-gray-950">
                      {item.amount}원
                    </span>
                  </div>

                  {/* Tablet: 2x2 grid */}
                  <div className="flex w-full flex-col max-sm:hidden">
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
                            <Badge />
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

                  {/* Mobile: stacked rows */}
                  <div className="hidden w-full flex-col max-sm:flex">
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
                        <Badge />
                      </div>
                    </div>
                    <div className="flex h-[49px] w-full items-center">
                      <div className="flex h-full w-[140px] shrink-0 items-start border-b border-r border-solid border-gray-100 px-2 py-4">
                        <span className="text-[14px] tracking-[-0.35px] text-gray-950">
                          구매 승인일
                        </span>
                      </div>
                      <div className="flex h-full min-w-0 flex-1 items-start border-b border-solid border-gray-100 p-4">
                        <span className="text-[14px] font-bold tracking-[-0.35px] text-gray-900">
                          {item.approvedDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full items-start">
                      <div className="flex w-[140px] shrink-0 items-start self-stretch border-b border-r border-solid border-gray-100 px-2 py-4">
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
                </li>
              ))}
            </ul>

            <Pagination />
          </>
        )}
      </main>
    </div>
  );
}
