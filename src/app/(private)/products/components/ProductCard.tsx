import Image from 'next/image';
import Link from 'next/link';
import icLikeActive from '@/assets/icons/ic_like_active.svg';
import icLikeNormal from '@/assets/icons/ic_like_normal.svg';

// products(useProducts 등 실제 API)와 wishlist 양쪽에서 같이 쓰기 때문에,
// 전체 Product 도메인 타입 대신 실제로 렌더링에 쓰는 필드만 최소 요구한다.
type ProductCardData = {
  id: number;
  name: string;
  price: number;
  totalSold: number;
  imageUrl: string;
};

type ProductCardProps = {
  product: ProductCardData;
  /** 찜 여부 — 이미지 영역 우하단 하트 아이콘의 채움/테두리 상태를 결정 */
  liked?: boolean;
  onLikeClick?: () => void;
  className?: string;
};

function formatPrice(price: number) {
  return `${price.toLocaleString('ko-KR')}원`;
}

export default function ProductCard({
  product,
  liked = false,
  onLikeClick,
  className = '',
}: ProductCardProps) {
  return (
    <li className={`min-w-0 flex-1 ${className}`.trim()}>
      <article>
        <Link
          href={`/products/${product.id}`}
          className="flex min-w-0 flex-1 flex-col gap-5 max-lg:gap-3.5"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-[2px] bg-gray-50 shadow-[4px_4px_10px_rgba(250,247,243,0.25)]">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
            <button
              type="button"
              aria-label={liked ? '찜 해제' : '찜하기'}
              className="absolute bottom-5 right-5 z-10 size-[30px] shrink-0 overflow-hidden"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onLikeClick?.();
              }}
            >
              <Image
                src={liked ? icLikeActive : icLikeNormal}
                alt=""
                fill
                className="object-contain"
              />
            </button>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-2 max-lg:grid-cols-1 max-lg:justify-items-start">
            <p className="break-words text-[18px] tracking-[-0.45px] text-black max-lg:text-[16px] max-lg:tracking-[-0.4px]">
              {product.name}
            </p>
            <p className="text-[14px] font-bold tracking-[-0.35px] text-secondary-500 max-lg:row-start-3 max-lg:text-[13px] max-lg:tracking-[-0.325px]">
              {product.totalSold}회 구매
            </p>
            <p className="col-span-2 text-[18px] font-extrabold tracking-[-0.45px] text-black max-lg:col-span-1 max-lg:row-start-2 max-lg:text-[16px] max-lg:tracking-[-0.4px]">
              {formatPrice(product.price)}
            </p>
          </div>
        </Link>
      </article>
    </li>
  );
}
