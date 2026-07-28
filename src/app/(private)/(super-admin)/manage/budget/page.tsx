import Button from '@/components/Button';
import BudgetAmountField from './components/BudgetAmountField';

export default function BudgetPage() {
  return (
    <main className="flex w-full max-w-[960px] flex-col gap-[120px] max-lg:max-w-none max-sm:gap-20">
      <section className="flex w-full flex-col gap-16 max-sm:gap-12">
        <header className="flex w-full flex-col gap-3 max-lg:py-5 max-sm:gap-2 max-sm:py-0">
          <h1 className="text-[24px] font-bold tracking-[-0.6px] text-black max-sm:text-[18px] max-sm:tracking-[-0.45px]">
            예산 관리
          </h1>
          <p className="text-[16px] tracking-[-0.4px] text-gray-500 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
            이번 달 예산을 정해서 지출을 관리해보세요
          </p>
        </header>

        <div className="flex w-full flex-col gap-20 max-lg:gap-16">
          <BudgetAmountField label="이번 달" />
          <BudgetAmountField label="매달 시작" />
        </div>
      </section>

      <div className="w-full max-w-[447px] max-lg:max-w-[360px] max-sm:max-w-none">
        <Button type="button">수정하기</Button>
      </div>
    </main>
  );
}
