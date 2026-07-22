import Image from 'next/image';
import { Fragment } from 'react';
import icChevronRight from '@/assets/icons/ic_chevron__right.svg';

export type CartFlow = 'purchase' | 'request';
export type CartStep = 1 | 2 | 3;

type CartStepIndicatorProps = {
  flow?: CartFlow;
  currentStep: CartStep;
};

const FLOW_STEPS: Record<
  CartFlow,
  readonly { step: CartStep; label: string }[]
> = {
  purchase: [
    { step: 1, label: '1 Shopping Cart' },
    { step: 2, label: '2 Order Confirmed' },
  ],
  request: [
    { step: 1, label: '1 Shopping Cart' },
    { step: 2, label: '2 Order' },
    { step: 3, label: '3 Order Confirmed' },
  ],
};

export default function CartStepIndicator({
  flow = 'request',
  currentStep,
}: CartStepIndicatorProps) {
  const steps = FLOW_STEPS[flow];

  return (
    <ol className="flex list-none items-center justify-center gap-5 max-sm:flex-col max-sm:gap-2.5">
      {steps.map(({ step, label }, index) => (
        <Fragment key={step}>
          {index > 0 && (
            <li
              className="relative size-6 shrink-0 overflow-hidden max-sm:hidden"
              aria-hidden
            >
              <Image
                src={icChevronRight}
                alt=""
                fill
                className="object-contain"
              />
            </li>
          )}
          <li
            className={`text-[18px] font-bold tracking-[-0.45px] max-sm:text-[16px] max-sm:tracking-[-0.4px] ${
              step === currentStep ? 'text-gray-950' : 'text-gray-300'
            }`}
          >
            {label}
          </li>
        </Fragment>
      ))}
    </ol>
  );
}
