'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AlertModal from '@/components/AlertModal';
import Button from '@/components/Button';
import ProductModal from '@/app/(private)/products/components/ProductModal';
import { useCategories } from '@/features/product/hooks/useCategories';
import { useProduct } from '@/features/product/hooks/useProduct';
import { useProductMutations } from '@/features/product/hooks/useProductMutations';
import icChevronRight from '@/assets/icons/ic_chevron__right.svg';
import iconX from '@/assets/icons/icon_X.svg';
import icMenu from '@/assets/icons/ic_menu.svg';
import icPlus from '@/assets/icons/ic_plus.svg';
import { useAddCartItem } from '@/features/cart/hooks/useAddCartItem';
import QuantityDropdown from '@/components/QuantityDropdown';

type AccordionKey = 'benefit' | 'shipping' | 'fee';

type ProductDetailContentProps = {
  productId: number;
};

function formatPrice(price: number) {
  return `${price.toLocaleString('ko-KR')}원`;
}

function MinusIcon() {
  return (
    <span className="relative size-5 shrink-0 overflow-hidden" aria-hidden>
      <span className="absolute inset-y-[46.88%] inset-x-[12.5%] bg-gray-950" />
    </span>
  );
}

function PlusIcon() {
  return (
    <span className="relative size-5 shrink-0 overflow-hidden" aria-hidden>
      <Image src={icPlus} alt="" fill className="object-contain" />
    </span>
  );
}

const ACCORDION_ITEMS: {
  key: AccordionKey;
  title: string;
  content: ReactNode;
}[] = [
  {
    key: 'benefit',
    title: '구매혜택',
    content: (
      <p className="text-[16px] tracking-[-0.4px] text-gray-600 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        실 결제액의 1% 적립 예정(배송비 제외)
      </p>
    ),
  },
  {
    key: 'shipping',
    title: '배송 방법',
    content: (
      <p className="text-[16px] tracking-[-0.4px] text-gray-600 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        택배
      </p>
    ),
  },
  {
    key: 'fee',
    title: '배송비',
    content: (
      <div className="flex items-start gap-1.5 text-[16px] tracking-[-0.4px] max-sm:flex-col max-sm:text-[14px] max-sm:tracking-[-0.35px]">
        <p className="text-gray-600">3,000원 (50,000원 이상 무료 배송)</p>
        <p className="text-gray-400">도서산간 배송비 추가</p>
      </div>
    ),
  },
];

export default function ProductDetailContent({
  productId,
}: ProductDetailContentProps) {
  const router = useRouter();
  const { data: product, isLoading } = useProduct(productId);
  const { data: categories } = useCategories();
  const { deleteMutation } = useProductMutations();
  const { mutate: addCartItem, isPending: isAddingCartItem } = useAddCartItem();

  const [openSections, setOpenSections] = useState<
    Record<AccordionKey, boolean>
  >({
    benefit: true,
    shipping: true,
    fee: true,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [quantity, setQuantity] = useState(10);
  const [isAddCartItemErrorOpen, setIsAddCartItemErrorOpen] = useState(false);
  const [addCartErrorMessage, setAddCartErrorMessage] = useState('');

  const toggleSection = (key: AccordionKey) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  function handleAddCartItem() {
    addCartItem(
      { productId, quantity },
      {
        onSuccess: () => {
          router.push('/cart');
        },
        onError: (error: Error) => {
          setAddCartErrorMessage(error.message);
          setIsAddCartItemErrorOpen(true);
        },
      }
    );
  }

  async function handleDelete() {
    await deleteMutation.mutateAsync(productId);
    router.push('/products');
  }

  if (isLoading || !product) {
    return (
      <section className="flex min-w-0 flex-1 items-center justify-center py-20 max-sm:px-6">
        <p className="text-[16px] tracking-[-0.4px] text-gray-500">
          {isLoading ? '불러오는 중...' : '상품을 찾을 수 없습니다.'}
        </p>
      </section>
    );
  }

  const parentCategory = categories?.find((category) =>
    category.children.some((child) => child.id === product.categoryId)
  );

  return (
    <section className="flex min-w-0 flex-1 flex-col gap-[30px] max-sm:px-6">
      <div className="flex h-16 w-full items-center border-b border-solid border-gray-100 pb-5 max-lg:py-5 max-sm:h-auto max-sm:border-b-0 max-sm:p-0">
        <nav
          className="flex items-center gap-1 max-sm:w-full max-sm:pb-2.5 max-sm:pt-3.5"
          aria-label="breadcrumb"
        >
          {parentCategory ? (
            <span className="text-[16px] tracking-[-0.4px] text-gray-200 max-sm:text-[14px] max-sm:tracking-[-0.35px] max-sm:text-gray-300">
              {parentCategory.name}
            </span>
          ) : null}
          <span className="relative size-4 shrink-0 overflow-hidden">
            <Image
              src={icChevronRight}
              alt=""
              fill
              className="object-contain"
            />
          </span>
          <span className="text-[16px] tracking-[-0.4px] text-gray-950 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
            {product.category.name}
          </span>
        </nav>
      </div>

      <div className="flex w-full items-start gap-[30px] max-lg:flex-col max-lg:gap-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="relative size-[540px] shrink-0 overflow-hidden rounded-[2px] bg-gray-50 object-cover shadow-[4px_4px_10px_rgba(250,247,243,0.25)] max-lg:aspect-square max-lg:h-auto max-lg:w-full"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-8 pt-[30px] max-lg:w-full max-lg:shrink-0">
          <div className="flex w-full items-start gap-5">
            <div className="flex min-w-0 flex-1 items-center justify-between gap-5">
              <div className="flex min-w-0 flex-col gap-2 whitespace-nowrap">
                <div className="flex items-center gap-2 max-sm:flex-col max-sm:items-start">
                  <p className="text-[18px] tracking-[-0.45px] text-black">
                    {product.name}
                  </p>
                  <p className="text-[14px] font-bold tracking-[-0.35px] text-secondary-500">
                    {product.totalSold}회 구매
                  </p>
                </div>
                <p className="text-[18px] font-extrabold tracking-[-0.45px] text-black">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3.5">
                <span className="text-[16px] tracking-[-0.4px] text-gray-950">
                  수량
                </span>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <QuantityDropdown
                    value={quantity}
                    onChange={(quantity) => {
                      setQuantity(quantity);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="relative shrink-0">
              <button
                type="button"
                aria-label="상품 관리 메뉴"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="relative flex size-6 shrink-0 overflow-hidden"
              >
                <Image src={icMenu} alt="" fill className="object-contain" />
              </button>
              {isMenuOpen ? (
                <div className="absolute top-full right-0 z-10 flex w-[95px] flex-col items-start justify-center overflow-hidden border border-solid border-gray-100 bg-white">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsEditOpen(true);
                    }}
                    className="flex h-[50px] w-full items-center py-2 pr-5 pl-4"
                  >
                    <span className="text-center text-[16px] tracking-[-0.4px] text-gray-950">
                      상품 수정
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDeleteConfirmOpen(true);
                    }}
                    className="flex h-[50px] w-full items-center py-2 pr-5 pl-4"
                  >
                    <span className="text-center text-[16px] tracking-[-0.4px] text-gray-950">
                      상품 삭제
                    </span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex w-full flex-col gap-2.5">
            <Button
              type="button"
              onClick={handleAddCartItem}
              disabled={isAddingCartItem}
            >
              장바구니 담기
            </Button>

            <div className="flex w-full flex-col">
              {ACCORDION_ITEMS.map((item, index) => {
                const isOpen = openSections[item.key];
                const isLast = index === ACCORDION_ITEMS.length - 1;

                return (
                  <div
                    key={item.key}
                    className={`flex flex-col gap-1.5 py-10 max-sm:py-[30px] ${
                      isLast
                        ? ''
                        : 'border-b border-solid border-gray-100 max-lg:border-gray-200 max-sm:border-gray-100'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSection(item.key)}
                      className="flex w-full items-center justify-between"
                      aria-expanded={isOpen}
                    >
                      <span className="text-[18px] font-bold tracking-[-0.45px] text-gray-950 max-sm:text-[16px] max-sm:tracking-[-0.4px]">
                        {item.title}
                      </span>
                      {isOpen ? <MinusIcon /> : <PlusIcon />}
                    </button>
                    {isOpen ? item.content : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {isEditOpen ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 p-6 max-sm:items-end max-sm:p-0">
          <ProductModal
            product={product}
            onClose={() => setIsEditOpen(false)}
          />
        </div>
      ) : null}

      {isDeleteConfirmOpen ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 p-6 max-sm:items-end max-sm:p-0">
          <AlertModal
            icon={iconX}
            title="상품 삭제"
            content={
              '정말 이 상품을 삭제하시겠습니까?\n삭제 후 되돌릴 수 없습니다.'
            }
            cancelLabel="취소"
            confirmLabel="삭제하기"
            confirmDisabled={deleteMutation.isPending}
            onCancel={() => setIsDeleteConfirmOpen(false)}
            onConfirm={handleDelete}
          />
        </div>
      ) : null}

      {isAddCartItemErrorOpen ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20 p-6 max-sm:items-end max-sm:p-0">
          <AlertModal
            icon={iconX}
            title="장바구니 담기 실패"
            content={addCartErrorMessage}
            confirmLabel="확인"
            showCancel={false}
            onConfirm={() => setIsAddCartItemErrorOpen(false)}
          />
        </div>
      ) : null}
    </section>
  );
}
