import Link from 'next/link';
import type { Product } from '@/features/product/types/product.types';

type ProductCardProps = {
  product: Product;
  className?: string;
};

function formatPrice(price: number) {
  return `${price.toLocaleString('ko-KR')}원`;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className={`flex min-w-0 flex-1 flex-col gap-5 max-lg:gap-3.5 ${className}`.trim()}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- 외부(S3/picsum) 이미지라 next/image remotePatterns 설정 없이 바로 사용 */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="aspect-square w-full overflow-hidden rounded-[2px] bg-gray-50 object-cover shadow-[4px_4px_10px_rgba(250,247,243,0.25)]"
      />

      <div className="grid grid-cols-[auto_auto] items-center gap-x-2 gap-y-2 whitespace-nowrap max-lg:grid-cols-1 max-lg:justify-items-start">
        <p className="text-[18px] tracking-[-0.45px] text-black max-lg:text-[16px] max-lg:tracking-[-0.4px]">
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
  );
}
