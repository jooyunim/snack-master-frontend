import Image from 'next/image';
import Button from '@/components/Button';
import SortDropdown from '@/components/SortDropdown';
import icChevronRight from '@/assets/icons/ic_chevron__right.svg';
import icPlus from '@/assets/icons/ic_plus.svg';

type ProductListHeaderProps = {
  categoryLabel?: string;
  subLabel?: string;
  onRegisterClick: () => void;
};

export default function ProductListHeader({
  categoryLabel,
  subLabel,
  onRegisterClick,
}: ProductListHeaderProps) {
  return (
    <div className="relative flex w-full items-center justify-between border-b border-solid border-gray-100 pb-5 max-sm:flex-col max-sm:items-stretch max-sm:gap-1 max-sm:border-b-0 max-sm:pb-0">
      <nav
        className="flex items-center gap-1 max-sm:pb-2.5 max-sm:pt-3.5"
        aria-label="breadcrumb"
      >
        {categoryLabel ? (
          <>
            <span
              className={`text-[16px] tracking-[-0.4px] max-lg:text-[14px] max-lg:tracking-[-0.35px] ${
                subLabel ? 'text-gray-300' : 'text-gray-950'
              }`}
            >
              {categoryLabel}
            </span>
            {subLabel ? (
              <>
                <span className="relative size-4 shrink-0 overflow-hidden">
                  <Image
                    src={icChevronRight}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>
                <span className="text-[16px] tracking-[-0.4px] text-gray-950 max-lg:text-[14px] max-lg:tracking-[-0.35px]">
                  {subLabel}
                </span>
              </>
            ) : null}
          </>
        ) : (
          <span className="text-[16px] tracking-[-0.4px] text-gray-950 max-lg:text-[14px] max-lg:tracking-[-0.35px]">
            전체 상품
          </span>
        )}
      </nav>

      <div className="flex items-center gap-[30px] max-sm:justify-between max-sm:border-b max-sm:border-solid max-sm:border-gray-100 max-sm:pb-5">
        <SortDropdown />
        <Button
          type="button"
          onClick={onRegisterClick}
          size="sm"
          className="h-11 gap-1.5 rounded px-4 py-2.5 text-[14px] font-semibold tracking-[-0.35px] shadow-[0px_4px_3px_rgba(0,0,0,0.02)] backdrop-blur-[15px]"
        >
          <span className="relative size-4 shrink-0 overflow-hidden">
            <Image
              src={icPlus}
              alt=""
              fill
              className="object-contain invert"
            />
          </span>
          상품 등록
        </Button>
      </div>
    </div>
  );
}
