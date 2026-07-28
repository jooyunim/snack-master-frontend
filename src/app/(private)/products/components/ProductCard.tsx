import Image from 'next/image';
import Link from 'next/link';
import icLikeActive from '@/assets/icons/Property 1=active-1.svg';

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  purchaseCount: number;
  categorySlug: string;
  subSlug?: string;
  /** true면 이미지 영역 우하단에 찜 아이콘 표시 */
  liked?: boolean;
  onLikeClick?: () => void;
  className?: string;
};

function formatPrice(price: number) {
  return `${price.toLocaleString('ko-KR')}원`;
}

function productHref(id: number, categorySlug: string, subSlug?: string) {
  const params = new URLSearchParams({ category: categorySlug });
  if (subSlug) params.set('sub', subSlug);
  return `/products/${id}?${params.toString()}`;
}

export default function ProductCard({
  id,
  name,
  price,
  purchaseCount,
  categorySlug,
  subSlug,
  liked = false,
  onLikeClick,
  className = '',
}: ProductCardProps) {
  return (
    <Link
      href={productHref(id, categorySlug, subSlug)}
      className={`flex min-w-0 flex-1 flex-col gap-5 max-lg:gap-3.5 ${className}`.trim()}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[2px] bg-gray-50 shadow-[4px_4px_10px_rgba(250,247,243,0.25)]">
        {liked ? (
          <button
            type="button"
            aria-label="찜 해제"
            className="absolute bottom-5 right-5 z-10 size-[30px] shrink-0 overflow-hidden"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onLikeClick?.();
            }}
          >
            <Image src={icLikeActive} alt="" fill className="object-contain" />
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-[auto_auto] items-center gap-x-2 gap-y-2 whitespace-nowrap max-lg:grid-cols-1 max-lg:justify-items-start">
        <p className="text-[18px] tracking-[-0.45px] text-black max-lg:text-[16px] max-lg:tracking-[-0.4px]">
          {name}
        </p>
        <p className="text-[14px] font-bold tracking-[-0.35px] text-secondary-500 max-lg:row-start-3 max-lg:text-[13px] max-lg:tracking-[-0.325px]">
          {purchaseCount}회 구매
        </p>
        <p className="col-span-2 text-[18px] font-extrabold tracking-[-0.45px] text-black max-lg:col-span-1 max-lg:row-start-2 max-lg:text-[16px] max-lg:tracking-[-0.4px]">
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  );
}
