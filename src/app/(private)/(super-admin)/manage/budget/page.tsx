'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import { ApiError } from '@/lib/api';
import { useBudget } from '@/features/budget/hooks/useBudget';
import { useBudgetMutations } from '@/features/budget/hooks/useBudgetMutations';
import type { Budget } from '@/features/budget/types/budget.types';
import BudgetAmountField from './components/BudgetAmountField';

export default function BudgetPage() {
  const { data: budget } = useBudget();
  const { updateBudgetMutation } = useBudgetMutations();

  const [amount, setAmount] = useState('');
  const [defaultMonthlyBudget, setDefaultMonthlyBudget] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 서버에서 조회된 현재 값으로 입력 필드를 초기화 (이후엔 사용자가 수정한 값을 그대로 둔다).
  // 렌더 도중 state를 갱신하는 React 공식 패턴(useEffect 대신) — budget이 처음 로드되는
  // 시점에만 한 번 동기화되고, 그 이후 리렌더에서는 조건이 거짓이라 다시 실행되지 않는다.
  const [syncedBudget, setSyncedBudget] = useState<Budget | null>(null);
  if (budget && budget !== syncedBudget) {
    setSyncedBudget(budget);
    setAmount(String(budget.currentMonthBudget.amount));
    setDefaultMonthlyBudget(String(budget.defaultMonthlyBudget));
  }

  const handleSubmit = () => {
    setSuccessMessage(null);

    const parsedAmount = Number(amount);
    const parsedDefault = Number(defaultMonthlyBudget);

    if (!amount || !Number.isFinite(parsedAmount) || parsedAmount < 0) {
      setFormError('유효하지 않은 예산 금액입니다.');
      return;
    }
    if (
      !defaultMonthlyBudget ||
      !Number.isFinite(parsedDefault) ||
      parsedDefault < 0
    ) {
      setFormError('유효하지 않은 매달 시작 예산입니다.');
      return;
    }

    setFormError(null);
    updateBudgetMutation.mutate(
      { amount: parsedAmount, defaultMonthlyBudget: parsedDefault },
      {
        onSuccess: () => setSuccessMessage('예산이 수정되었습니다.'),
        onError: (error) =>
          setFormError(
            error instanceof ApiError ? error.message : '예산 수정에 실패했습니다.',
          ),
      },
    );
  };

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
          <BudgetAmountField
            label="이번 달"
            value={amount}
            onChange={setAmount}
            subscription={
              budget
                ? `${budget.currentMonthBudget.year}년 ${budget.currentMonthBudget.month}월 예산이에요`
                : undefined
            }
          />
          <BudgetAmountField
            label="매달 시작"
            value={defaultMonthlyBudget}
            onChange={setDefaultMonthlyBudget}
            subscription="다음 달부터 이 금액이 기본 예산으로 적용돼요"
          />
        </div>

        {formError ? (
          <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
            {formError}
          </p>
        ) : null}
        {successMessage ? (
          <p className="px-1 text-[14px] tracking-[-0.35px] text-secondary-500">
            {successMessage}
          </p>
        ) : null}
      </section>

      <div className="w-full max-w-[447px] max-lg:max-w-[360px] max-sm:max-w-none">
        <Button
          type="button"
          disabled={updateBudgetMutation.isPending}
          onClick={handleSubmit}
        >
          {updateBudgetMutation.isPending ? '수정 중...' : '수정하기'}
        </Button>
      </div>
    </main>
  );
}
