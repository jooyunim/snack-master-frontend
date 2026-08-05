import type { DashboardSummary } from '@/features/purchase/purchase.types';
import { formatWon } from '@/features/purchase/format';
import BudgetRemainHoverCard from './BudgetRemainHoverCard';

type Props = { summary: DashboardSummary };

export default function BudgetSummaryCards({ summary }: Props) {
  const {
    currentMonthBudget,
    lastMonthBudget,
    remainingBudget,
    lastMonthRemaining,
    thisMonthExpense,
    lastMonthExpense,
    thisYearExpense,
    lastYearExpense,
  } = summary;

  // 사용률: 지출 / 이번 달 예산
  const percent =
    currentMonthBudget > 0
      ? Math.min(100, Math.round((thisMonthExpense / currentMonthBudget) * 100))
      : 0;
  const yearDiff = thisYearExpense - lastYearExpense;

  return (
    <div className="relative flex w-full gap-[30px] pb-10 max-lg:gap-5 max-sm:grid max-sm:grid-cols-2 max-sm:items-start max-sm:gap-4 max-sm:pb-0">
      {/* 1. 이번 달 예산 */}
      <div className="flex flex-1 flex-col justify-center gap-2 overflow-hidden rounded bg-gray-50 py-[30px] pl-[30px] pr-10 max-lg:justify-between max-lg:gap-0 max-lg:p-5 max-sm:gap-5">
        <div className="flex w-full items-start justify-between text-gray-950 max-lg:flex-col max-lg:gap-2.5">
          <p className="text-[18px] font-bold tracking-[-0.45px] max-sm:text-[16px] max-sm:tracking-[-0.4px]">
            이번 달 예산
          </p>
          <p className="text-[24px] font-extrabold tracking-[-0.6px] max-sm:text-[18px] max-sm:tracking-[-0.45px]">
            {formatWon(currentMonthBudget)}
          </p>
        </div>
        <p className="text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-600 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
          지난 달 예산은
          <br />
          {formatWon(lastMonthBudget)}이었어요
        </p>
      </div>

      {/* 2. 이번 달 지출액 + 호버 */}
      <div className="group relative flex flex-1 flex-col gap-5 overflow-visible rounded bg-gray-50 py-[30px] pl-[30px] pr-10 max-lg:gap-4 max-lg:p-5 max-sm:h-full max-sm:overflow-hidden">
        <BudgetRemainHoverCard
          remainingBudget={remainingBudget}
          lastMonthRemaining={lastMonthRemaining}
        />

        <div className="flex w-full items-start justify-between max-lg:flex-col max-lg:gap-2.5">
          <div className="flex flex-col gap-2">
            <p className="text-[18px] font-bold tracking-[-0.45px] text-gray-950 max-sm:text-[16px] max-sm:tracking-[-0.4px]">
              이번 달 지출액
            </p>
            <p className="text-[16px] tracking-[-0.4px] text-gray-600 max-lg:hidden">
              지난 달: {formatWon(lastMonthExpense)}
            </p>
          </div>
          <p className="text-[24px] font-extrabold tracking-[-0.6px] text-gray-950 max-sm:text-[18px] max-sm:tracking-[-0.45px]">
            {formatWon(thisMonthExpense)}
          </p>
        </div>
        <p className="hidden text-[16px] tracking-[-0.4px] text-gray-600 max-lg:block max-sm:text-[14px] max-sm:tracking-[-0.35px]">
          지난 달: {formatWon(lastMonthExpense)}
        </p>
        <div className="flex w-full items-center justify-center gap-2.5 max-sm:gap-1">
          <div className="relative h-1.5 w-full flex-1 overflow-hidden rounded-[6px] bg-gray-200">
            <div
              className="absolute inset-y-0 left-0 rounded-[6px] bg-secondary-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="shrink-0 text-[14px] tracking-[-0.35px] text-gray-950 max-sm:text-[12px]">
            {percent}%
          </span>
        </div>
      </div>

      {/* 3. 올해 총 지출액 */}
      <div className="flex flex-1 flex-col justify-center gap-2 overflow-hidden rounded bg-gray-50 py-[30px] pl-[30px] pr-10 max-lg:justify-between max-lg:gap-0 max-lg:p-5 max-sm:col-span-2 max-sm:h-[156px]">
        <div className="flex w-full items-center justify-between max-lg:flex-col max-lg:items-start max-lg:gap-2.5">
          <p className="text-[18px] font-bold tracking-[-0.45px] text-gray-950 max-sm:text-[16px] max-sm:tracking-[-0.4px]">
            올해 총 지출액
          </p>
          <p className="text-[24px] font-extrabold tracking-[-0.6px] text-gray-950 max-sm:text-[18px] max-sm:tracking-[-0.45px]">
            {formatWon(thisYearExpense)}
          </p>
        </div>
        <p className="text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-600 max-lg:hidden">
          올해 작년보다
          <br />
          {formatWon(Math.abs(yearDiff))} {yearDiff >= 0 ? '더' : '덜'}{' '}
          지출했어요
        </p>
        <p className="hidden text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-600 max-lg:block max-sm:text-[14px]">
          작년보다 {formatWon(Math.abs(yearDiff))}
          <br />
          {yearDiff >= 0 ? '더' : '덜'} 지출했어요
        </p>
      </div>
    </div>
  );
}
