import BudgetRemainHoverCard from './BudgetRemainHoverCard';

export default function BudgetSummaryCards() {
  return (
    <div className="relative flex w-full gap-[30px] pb-0 max-lg:gap-5 max-lg:pb-10 max-sm:grid max-sm:grid-cols-2 max-sm:items-start max-sm:gap-4 max-sm:pb-0">
      <BudgetRemainHoverCard />

      <div className="flex flex-1 flex-col justify-center gap-2 overflow-hidden rounded bg-gray-50 py-[30px] pl-[30px] pr-10 max-lg:justify-between max-lg:gap-0 max-lg:p-5 max-sm:gap-5">
        <div className="flex w-full items-start justify-between text-gray-950 max-lg:flex-col max-lg:gap-2.5">
          <p className="text-[18px] font-bold tracking-[-0.45px] max-sm:text-[16px] max-sm:tracking-[-0.4px]">
            이번 달 예산
          </p>
          <p className="text-[24px] font-extrabold tracking-[-0.6px] max-sm:text-[18px] max-sm:tracking-[-0.45px]">
            1,000,000원
          </p>
        </div>
        <p className="text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-600 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
          지난 달 예산은
          <br />
          2,000,000원이었어요
        </p>
      </div>

      <div className="relative flex flex-1 flex-col gap-5 overflow-hidden rounded bg-gray-50 py-[30px] pl-[30px] pr-10 max-lg:gap-4 max-lg:overflow-visible max-lg:p-5 max-sm:h-[156px] max-sm:overflow-hidden">
        <div className="flex w-full items-start justify-between max-lg:flex-col max-lg:gap-2.5">
          <div className="flex flex-col gap-2">
            <p className="text-[18px] font-bold tracking-[-0.45px] text-gray-950 max-sm:text-[16px] max-sm:tracking-[-0.4px]">
              이번 달 지출액
            </p>
            <p className="text-[16px] tracking-[-0.4px] text-gray-600 max-lg:hidden">
              지난 달: 2,000,000원
            </p>
          </div>
          <p className="text-[24px] font-extrabold tracking-[-0.6px] text-gray-950 max-sm:text-[18px] max-sm:tracking-[-0.45px]">
            126,000원
          </p>
        </div>
        <p className="hidden text-[16px] tracking-[-0.4px] text-gray-600 max-lg:block max-sm:text-[14px] max-sm:tracking-[-0.35px]">
          지난 달: 2,000,000원
        </p>
        <div className="flex w-full items-center justify-center gap-2.5 max-sm:gap-1">
          <div className="relative h-1.5 w-full flex-1 overflow-hidden rounded-[6px] bg-gray-200">
            <div className="absolute inset-y-0 left-0 w-[74%] rounded-[6px] bg-secondary-500" />
          </div>
          <span className="shrink-0 text-[14px] tracking-[-0.35px] text-gray-950 max-sm:text-[12px] max-sm:tracking-[-0.3px]">
            74%
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-2 overflow-hidden rounded bg-gray-50 py-[30px] pl-[30px] pr-10 max-lg:justify-between max-lg:gap-0 max-lg:p-5 max-sm:col-span-2 max-sm:h-[156px]">
        <div className="flex w-full items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-2.5">
          <p className="text-[18px] font-bold tracking-[-0.45px] text-gray-950 max-sm:text-[16px] max-sm:tracking-[-0.4px]">
            올해 총 지출액
          </p>
          <p className="text-[24px] font-extrabold tracking-[-0.6px] text-gray-950 max-sm:text-[18px] max-sm:tracking-[-0.45px]">
            10,000,000원
          </p>
        </div>
        <p className="text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-600 max-lg:hidden">
          올해 작년보다
          <br />
          6,000,000원 더 지출했어요
        </p>
        <p className="hidden text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-600 max-lg:block max-sm:text-[14px] max-sm:tracking-[-0.35px]">
          작년보다 6,000,000원
          <br />더 지출했어요
        </p>
      </div>
    </div>
  );
}
