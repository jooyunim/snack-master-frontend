'use client';

import { useMemo } from 'react';
import Button from '@/components/Button';
import CartStepIndicator from '../../components/CartStepIndicator';
import RequestItemsSection, {
  type RequestItem,
} from '@/components/RequestItemsSection';
import RequestMessage from '../../components/RequestMessage';
import { useRouter } from 'next/navigation';
import {
  type CartItem,
  type RequestMessage as RequestMessageFormValues,
  requestMessageSchema,
} from '@/features/cart/schemas/cart';
import { useOrderItems } from '@/features/cart/hooks/useOrderItems';
import { useCreatePurchaseRequest } from '@/features/cart/hooks/useCreatePurchaseRequest';
import { CartOrderContentProps } from '@/features/cart/types/cart.type';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CartOrderContent({
  selectedIds,
}: CartOrderContentProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RequestMessageFormValues>({
    resolver: zodResolver(requestMessageSchema),
    defaultValues: {
      requestMessage: '',
    },
  });

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

  const { mutate: submitPurchaseRequest, isPending } =
    useCreatePurchaseRequest(selectedIds);

  const requestMessage = useWatch({
    control,
    name: 'requestMessage',
    defaultValue: '',
  });

  const onValid = (data: RequestMessageFormValues) => {
    if (isPending) return;
    submitPurchaseRequest(data.requestMessage);
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
        {/* user는 order 단계 필요하므로 flow="request" 고정 유지 */}
        <CartStepIndicator flow="request" currentStep={2} />

        <div className="flex w-full flex-col gap-10">
          <RequestItemsSection
            itemCount={orderItems.length}
            items={isLoading ? [] : orderItems}
            orderAmount={formatPrice(orderAmount)}
            shippingFee={formatPrice(orderShippingFee)}
            totalAmount={formatPrice(totalAmount)}
          />
          <RequestMessage
            {...register('requestMessage')}
            characterCount={requestMessage?.length ?? 0}
            error={errors.requestMessage?.message}
          />
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
              variant="filled"
              className="w-full"
              disabled={isPending || selectedItems.length === 0}
              onClick={handleSubmit(onValid)}
            >
              {isPending ? '요청 중...' : '구매 요청'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
