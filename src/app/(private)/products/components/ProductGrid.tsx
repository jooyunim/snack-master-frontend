import Image from 'next/image';
import Button from '@/components/Button';
import ProductCard from '@/app/(private)/products/components/ProductCard';
import type { Product } from '@/features/product/types/product.types';
import icChevronDown from '@/assets/icons/ic_chevron_down.svg';

type ProductGridProps = {
  products: Product[];
  hasNext: boolean;
  isFetchingNext: boolean;
  onLoadMore: () => void;
};

export default function ProductGrid({
  products,
  hasNext,
  isFetchingNext,
  onLoadMore,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <p className="text-[16px] tracking-[-0.4px] text-gray-500">
          해당 카테고리에 상품이 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-[30px] max-lg:gap-10 max-sm:gap-5">
      <div className="flex w-full flex-col gap-[60px] pb-[30px] max-lg:gap-[50px] max-lg:pb-0 max-sm:gap-10">
        <div className="grid w-full grid-cols-3 gap-x-10 gap-y-[60px] max-lg:gap-x-3.5 max-lg:gap-y-[50px] max-sm:grid-cols-2 max-sm:gap-x-4 max-sm:gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {hasNext ? (
        <Button
          type="button"
          variant="line"
          disabled={isFetchingNext}
          onClick={onLoadMore}
          className="h-16 gap-2 text-[14px] font-medium tracking-[-0.35px] text-gray-800 max-sm:h-11"
        >
          {isFetchingNext ? '불러오는 중...' : '더보기'}
          <span className="relative size-5 shrink-0 overflow-hidden">
            <Image src={icChevronDown} alt="" fill className="object-contain" />
          </span>
        </Button>
      ) : null}
    </div>
  );
}
