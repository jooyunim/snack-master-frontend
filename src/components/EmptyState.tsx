import Image from 'next/image';
import Button from '@/components/Button';
import emptyIcon from '@/assets/icons/Frame 2610897.svg';

type EmptyStateProps = {
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
};

export default function EmptyState({
  title,
  description,
  buttonLabel,
  onButtonClick,
}: EmptyStateProps) {
  return (
    <div className="flex w-[310px] flex-col items-center gap-[30px] self-center max-sm:w-full max-sm:gap-5">
      <span className="relative size-[100px] shrink-0 overflow-hidden">
        <Image src={emptyIcon} alt="" fill className="object-contain" />
      </span>

      <div className="flex w-full flex-col items-center gap-[50px] max-sm:gap-10">
        <div className="flex w-[299px] flex-col items-center gap-2.5 text-center">
          <p className="w-full text-[24px] font-extrabold tracking-[-0.6px] text-gray-950 max-sm:text-[18px] max-sm:tracking-[-0.45px]">
            {title}
          </p>
          <p className="w-full whitespace-pre-line text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-800 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
            {description}
          </p>
        </div>

        {buttonLabel ? (
          <Button className="w-full" onClick={onButtonClick}>
            {buttonLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
