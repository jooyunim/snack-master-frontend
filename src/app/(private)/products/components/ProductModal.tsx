import Image from 'next/image';
import Button from '@/components/Button';
import Input from '@/components/Input';
import CategoryDropdown from '@/app/(private)/products/components/CategoryDropdown';
import icChevronDown from '@/assets/icons/ic_chevron_down.svg';
import iconPhoto from '@/assets/icons/icon_photo.svg';

export default function ProductRegisterModal() {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-register-title"
      className="flex w-[512px] flex-col items-center gap-9 rounded-[6px] bg-white p-[30px] shadow-[0_0_15px_rgba(0,0,0,0.14)] max-sm:w-full max-sm:gap-0 max-sm:rounded-none max-sm:p-0 max-sm:shadow-none"
    >
      <div className="flex w-full flex-col items-center gap-[30px] max-sm:gap-5 max-sm:px-6 max-sm:pb-[112px]">
        <h2
          id="product-register-title"
          className="text-[18px] font-bold tracking-[-0.45px] text-gray-950 max-sm:mb-2.5 max-sm:flex max-sm:h-11 max-sm:w-[calc(100%+3rem)] max-sm:-mx-6 max-sm:shrink-0 max-sm:items-center max-sm:justify-center max-sm:p-2"
        >
          상품 등록
        </h2>

        <button
          type="button"
          aria-label="상품 이미지 업로드"
          className="relative flex size-[140px] shrink-0 items-center justify-center overflow-hidden rounded-[2px] border border-solid border-gray-200 bg-white max-sm:mb-2.5"
        >
          <span className="relative size-[30px] shrink-0 overflow-hidden">
            <Image src={iconPhoto} alt="" fill className="object-contain" />
          </span>
        </button>

        <div className="flex w-full items-start gap-5">
          <div className="relative min-w-0 flex-1">
            <div className="flex h-14 w-full items-center justify-between border border-solid border-gray-200 bg-white px-4 py-2.5">
              <span className="whitespace-nowrap text-[16px] tracking-[-0.4px] text-gray-500">
                대분류
              </span>
              <span className="relative size-4 shrink-0 overflow-hidden">
                <Image
                  src={icChevronDown}
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
            </div>
          </div>

          <CategoryDropdown />
        </div>

        <Input placeholder="상품명을 입력해주세요" />
        <Input placeholder="가격을 입력해주세요" />
        <Input placeholder="제품 링크를 입력해주세요" />
      </div>

      <div className="flex w-full items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:bg-white max-sm:p-6">
        <Button variant="line" className="min-w-0 flex-1">
          취소
        </Button>
        <Button variant="filled" className="min-w-0 flex-1">
          등록하기
        </Button>
      </div>
    </div>
  );
}
