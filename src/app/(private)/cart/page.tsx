'use client';

import Image from 'next/image';
import Link from 'next/link';
import icCheckboxActive from '@/assets/icons/Property 1=active.svg';
import icCheckboxInactive from '@/assets/icons/Property 1=normal.svg';
import Button from '@/components/Button';
import CartStepIndicator, {
  type CartFlow,
} from './components/CartStepIndicator';
import QuantityDropdown from './components/QuantityDropdown';
import { useAuth } from '@/contexts/AuthContext';
import type { CartItem } from '@/features/cart/schemas/cart';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useCarts } from '@/features/cart/hooks/useCarts';
import { useDeleteCartItems } from '@/features/cart/hooks/useDeleteCartItems';
import { usePatchQuantity } from '@/features/cart/hooks/usePatchQuantity';

function CheckboxIcon({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      className="relative size-6 shrink-0 overflow-hidden max-sm:size-5"
      onClick={onChange}
      aria-pressed={checked}
      aria-label="체크박스 선택"
    >
      <Image
        src={checked ? icCheckboxActive : icCheckboxInactive}
        alt="체크박스"
        fill
        className="object-contain"
      />
    </button>
  );
}

export default function CartPage() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const router = useRouter();

  // user role에 따라 flow를 결정
  const { user } = useAuth();
  const cartFlow: CartFlow = user?.role === 'USER' ? 'request' : 'purchase';

  const { data, isPending, isError, refetch } = useCarts();

  const CART_ITEMS: CartItem[] = data?.cartItem ?? [];

  const shippingFee: number = data?.shippingFee ?? 0;

  // 선택된 아이템들
  const selectedItems = CART_ITEMS.filter((item) =>
    selectedIds.includes(item.id)
  );

  // 전체 선택 여부
  const isAllSelected =
    CART_ITEMS.length > 0 && selectedIds.length === CART_ITEMS.length;

  // 선택된 아이템들의 총 가격
  const productTotal = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 선택된 아이템들의 배송비
  const orderShippingFee = selectedItems.length > 0 ? shippingFee : 0;

  // 선택된 아이템들의 총 가격 + 배송비
  const orderTotal = productTotal + orderShippingFee;

  // 전체 선택 핸들러
  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(CART_ITEMS.map((item) => item.id));
  };

  // 아이템 선택 핸들러
  const handleSelectItem = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const formatPrice = (value: number) => `${value.toLocaleString('ko-KR')}원`;

  const { mutate: deleteSelectedItems } = useDeleteCartItems();

  const { mutate: patchCartQuantity, isPending: isPatchCartQuantityPending } =
    usePatchQuantity();

  //장바구니 -> 다음 페이지로 이동 함수
  const handleGoToOrder = (selectedIds: number[]) => {
    if (selectedIds.length === 0) return;
    if (cartFlow === 'purchase') {
      router.push(`/cart/purchase?cartItemIds=${selectedIds.join(',')}`);
      return;
    }
    router.push(`/cart/order?cartItemIds=${selectedIds.join(',')}`);
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-[16px] tracking-[-0.4px] text-gray-600">
          장바구니를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-[16px] tracking-[-0.4px] text-gray-600">
          장바구니 조회에 실패하였습니다. 다시 시도해주세요.
        </p>
        <button
          onClick={() => refetch()}
          className="text-[16px] tracking-[-0.4px] text-gray-600 underline max-sm:text-[14px] max-sm:tracking-[-0.35px] cursor-pointer"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-[70px] px-6 pb-20 pt-20 max-lg:pt-[60px] max-sm:gap-10">
        {/*  cartFlow(role 기반) 전달 */}
        <CartStepIndicator flow={cartFlow} currentStep={1} />

        <section className="flex w-full flex-col gap-5 rounded-[2px] bg-white px-[50px] py-10 shadow-[0_0_10px_rgba(0,0,0,0.12)] max-lg:p-5 max-sm:gap-0 max-sm:p-0 max-sm:shadow-none">
          <div className="flex w-full items-center justify-between max-lg:px-5 max-sm:px-0">
            <div className="flex h-10 items-center gap-2.5">
              <CheckboxIcon
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
              <p className="text-[18px] font-bold tracking-[-0.45px] text-black max-sm:text-[16px] max-sm:tracking-[-0.4px]">
                전체 선택 ({CART_ITEMS.length}개)
              </p>
            </div>
            <button
              onClick={() =>
                deleteSelectedItems(selectedIds, {
                  onSuccess: () => setSelectedIds([]),
                })
              }
              disabled={selectedItems.length === 0}
              className="text-[16px] tracking-[-0.4px] text-gray-600 underline max-sm:text-[14px] max-sm:tracking-[-0.35px] cursor-pointer"
            >
              선택 삭제
            </button>
          </div>

          <ul className="flex w-full flex-col">
            {CART_ITEMS.map((item, index) => (
              <li
                key={item.id}
                className={`flex w-full items-center gap-5 py-[30px] max-lg:px-5 max-sm:items-center max-sm:gap-2.5 max-sm:px-0 max-sm:py-5 ${
                  index < CART_ITEMS.length - 1
                    ? 'border-b border-solid border-gray-100'
                    : 'max-sm:border-b max-sm:border-solid max-sm:border-gray-100'
                }`}
              >
                <CheckboxIcon
                  checked={selectedIds.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  aria-label="체크박스 선택"
                />

                <div className="flex min-w-0 flex-1 items-center gap-5 max-sm:items-start max-sm:gap-3">
                  <div className="relative flex size-[140px] shrink-0 items-center justify-center bg-white shadow-[4px_4px_10px_rgba(250,247,243,0.25)] max-sm:size-[81px] max-sm:rounded-[2px] max-sm:bg-gray-50 max-sm:p-6 max-sm:shadow-none">
                    <div className="relative h-[102px] w-[59px] max-sm:h-[50px] max-sm:w-[29px]">
                      <Image
                        src={item.imageUrl}
                        alt={item.productName}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-5 max-sm:gap-0">
                    <div className="flex w-full items-end gap-10 max-sm:items-center max-sm:gap-0">
                      <div className="flex min-w-0 flex-1 flex-col gap-2 text-[16px] tracking-[-0.4px] text-gray-950 max-sm:gap-1 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
                        <p>{item.productName}</p>
                        <p className="font-bold max-sm:font-extrabold">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <QuantityDropdown
                          value={item.quantity}
                          onChange={(quantity) =>
                            patchCartQuantity({ id: item.id, quantity })
                          }
                        />
                        <p className="text-[24px] font-extrabold tracking-[-0.6px] text-gray-950 max-lg:leading-8 max-lg:tracking-normal max-sm:hidden">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>

                    <div className="flex w-full items-start justify-between max-sm:items-center">
                      <p className="text-[14px] tracking-[-0.35px] text-gray-600 max-sm:text-[13px] max-sm:tracking-[-0.325px]">
                        배송비 {formatPrice(shippingFee)}
                      </p>
                      {/* {추후에 구현될 때 사용할 버튼} */}
                      {/* <Button
                        variant="sub"
                        className="w-[99px] max-sm:w-[88px] max-sm:text-[13px] max-sm:tracking-[-0.325px]"
                      >
                        바로 요청
                      </Button> */}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex w-full items-center gap-[60px] max-lg:gap-10 max-sm:flex-col max-sm:gap-[30px]">
          <div className="flex min-w-0 flex-1 flex-col items-center gap-3.5 max-sm:w-full">
            <div className="flex w-full items-center gap-1 text-center text-[30px] tracking-[-0.75px] text-gray-950 max-sm:text-[24px] max-sm:tracking-[-0.6px]">
              <p className="font-bold">총 주문금액</p>
              <p className="font-extrabold">{formatPrice(orderTotal)}</p>
            </div>
            <div className="flex w-full flex-col gap-1.5 pb-2.5 text-[16px] tracking-[-0.4px] text-gray-600 max-sm:pb-1.5">
              <p>주문 상품은 {formatPrice(productTotal)}</p>
              <p>배송비는 {formatPrice(orderShippingFee)}입니다.</p>
            </div>
          </div>

          <div className="flex w-[300px] shrink-0 flex-col items-end justify-center gap-5 max-sm:w-full">
            <Link href="/products" className="w-full">
              <Button variant="line" className="w-full">
                계속 쇼핑하기
              </Button>
            </Link>

            <Button
              onClick={() => handleGoToOrder(selectedIds)}
              disabled={
                selectedItems.length === 0 || isPatchCartQuantityPending
              }
              variant="filled"
              className="w-full"
            >
              {cartFlow === 'request' ? '구매 요청' : '구매하기'}
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
