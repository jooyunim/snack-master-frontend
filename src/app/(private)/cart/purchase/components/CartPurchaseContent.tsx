'use client';

import RequestItemsSection, {
  RequestItem,
} from '@/components/RequestItemsSection';
import { CartItem } from '@/features/cart/schemas/cart';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import CartStepIndicator from '../../components/CartStepIndicator';
import Button from '@/components/Button';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreatePurchaseFormValues,
  createPurchaseSchema,
} from '@/features/cart/schemas/purchase';
import { useOrderItems } from '@/features/cart/hooks/useOrderItems';
import { usePoints } from '@/features/cart/hooks/usePoints';
import { useCreatePurchase } from '@/features/cart/hooks/useCreatePurchase';

type CartPurchaseContentProps = {
  selectedIds: number[];
};

export default function CartPurchaseContent({
  selectedIds,
}: CartPurchaseContentProps) {
  const router = useRouter();

  const { data, isLoading, isError, refetch } = useOrderItems(selectedIds);

  const formatPrice = (value: number) => `${value.toLocaleString('ko-KR')}원`;

  const shippingFee: number = data?.shippingFee ?? 3000;

  const selectedItems = useMemo(() => {
    const cartItems: CartItem[] = data?.cartItem ?? [];
    return cartItems.filter((item) => selectedIds.includes(item.id));
  }, [data?.cartItem, selectedIds]);

  const orderItems: RequestItem[] = selectedItems.map((item) => ({
    id: item.id,
    name: item.productName,
    price: formatPrice(item.price),
    quantity: `수량 ${item.quantity}개`,
    totalPrice: formatPrice(item.price * item.quantity),
    imageSrc: item.imageUrl,
  }));

  const orderAmount = selectedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const orderShippingFee = selectedItems.length > 0 ? shippingFee : 0;
  const totalAmount = orderAmount + orderShippingFee;

  const { data: balancePointData } = usePoints();

  const point = balancePointData?.balancePointAmount ?? 0;

  const purchaseSchema = createPurchaseSchema(point, totalAmount);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePurchaseFormValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      requestPointAmount: 0,
    },
  });

  const requestPointAmount = useWatch({
    control,
    name: 'requestPointAmount',
    defaultValue: 0,
  });

  const safeRequestPointAmount = Number.isFinite(requestPointAmount)
    ? requestPointAmount
    : 0;

  const paidAmountWithoutShippingFee = Math.max(
    totalAmount - orderShippingFee - safeRequestPointAmount,
    0
  );
  const paidAmount = Math.max(totalAmount - safeRequestPointAmount, 0);
  const reward = Math.floor(paidAmountWithoutShippingFee * 0.01);

  const { mutate: submitPurchase, isPending } = useCreatePurchase(selectedIds);

  const onValid = (data: CreatePurchaseFormValues) => {
    submitPurchase(data.requestPointAmount);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-[16px] tracking-[-0.4px] text-gray-600">
          구매할 상품 내역을 불러오는 중입니다...
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
          type="button"
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
      <main className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-[50px] px-6 pb-20 pt-20 max-lg:pt-[60px] max-sm:gap-10 max-sm:px-[25px] max-sm:pb-[136px] max-sm:pt-10">
        <h1 className="sr-only">구매</h1>
        <CartStepIndicator flow="purchase" currentStep={2} />

        <div className="flex w-full flex-col gap-10">
          <RequestItemsSection
            itemCount={orderItems.length}
            items={isLoading ? [] : orderItems}
            orderAmount={formatPrice(orderAmount)}
            shippingFee={formatPrice(orderShippingFee)}
            totalAmount={formatPrice(totalAmount)}
          />
        </div>
        <form
          id="purchase-form"
          onSubmit={handleSubmit(onValid)}
          className="flex w-full flex-row items-center justify-end gap-2"
        >
          <label htmlFor="request-point" className="sr-only">
            사용할 포인트
          </label>
          <input
            id="request-point"
            type="number"
            min={0}
            max={point}
            step={1}
            {...register('requestPointAmount', { valueAsNumber: true })}
            className="w-1/8 rounded border border-gray-300 bg-transparent px-2 py-1 text-right text-[14px] leading-none tracking-[-0.35px] text-gray-600 outline-none focus:border-gray-500 max-sm:text-[13px] max-sm:tracking-[-0.325px]"
          />
          <span className="text-[16px] font-bold leading-none tracking-[-0.4px] text-gray-600 max-sm:text-[14px] max-sm:tracking-[-0.35px]">{`/ ${point} P`}</span>
          {errors.requestPointAmount && (
            <p className="px-1 text-[14px] tracking-[-0.35px] text-red-500">
              {errors.requestPointAmount.message}
            </p>
          )}
        </form>

        <div className="flex flex-col w-full justify-end gap-2 text-[16px] font-bold tracking-[-0.4px] text-gray-700 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
          <p className="text-right">적립액: {reward} P</p>
          <p className="text-right text-[24px] font-extrabold tracking-[-0.6px] text-black max-sm:text-[18px] max-sm:tracking-[-0.45px]">
            실결제액: {formatPrice(paidAmount)}
          </p>
        </div>

        <div className="flex h-16 w-full max-w-[616px] items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:h-auto max-sm:max-w-none max-sm:gap-4 max-sm:bg-white max-sm:p-6">
          <Button
            variant="line"
            className="w-full"
            onClick={() => router.push('/cart')}
          >
            취소
          </Button>
          <div className="w-[300px] shrink-0 max-sm:w-auto max-sm:flex-1 max-sm:shrink">
            <Button
              type="submit"
              form="purchase-form"
              variant="filled"
              className="w-full"
              disabled={isPending || selectedItems.length === 0}
            >
              구매하기
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
