'use client';

import Image from 'next/image';
import Button from '@/components/Button';
import { useRequestDetail } from '@/features/purchase-request-manage/hooks/useRequestDetail';
import { useRequestMutations } from '@/features/purchase-request-manage/hooks/useRequestMutation';
import { useState } from 'react';
import Toast from '@/components/Toast';
import { usePoints } from '@/features/cart/hooks/usePoints';
import { ApiError } from '@/lib/api';

import { getInitials } from '../utils/getInitials';
import AlertModal from '@/components/AlertModal';
import icAlert from '@/assets/icons/ic_!.svg';
import { usePurchaseResultForm } from '@/features/purchase-request-manage/hooks/usePurchaseResultForm';
import { PurchaseResultFormValues } from '@/features/purchase-request-manage/schemas/purchaseResultForm.schema';
import { Controller } from 'react-hook-form';
import pointCalculate from '../utils/pointCalculate';

export default function PurchaseRequestModal({
  requestId,
  onClose,
  mode,
}: {
  requestId: number;
  onClose: () => void;
  mode: 'approve' | 'reject';
}) {
  const { data, isPending, isError } = useRequestDetail(requestId);
  const { patchApproveMutation, patchRejectMutation } = useRequestMutations();
  const [showAlert, setShowAlert] = useState(true);
  const [showResultModal, setShowResultModal] = useState(false);
  const { data: balancePointData } = usePoints();
  const pointBalance = balancePointData?.balancePointAmount ?? 0;

  const maxPoint = pointBalance;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = usePurchaseResultForm(maxPoint, data?.requestAmount ?? 0);

  const pointAmount = watch('pointAmount');

  const isApprove = mode === 'approve';
  const mutation = isApprove ? patchApproveMutation : patchRejectMutation;

  // 데이터 로딩 중이거나 에러 발생 시 처리
  if (isPending) return <div className="p-10 text-center">로딩중...</div>;
  if (isError || !data)
    return <div className="p-10 text-center">에러가 발생했습니다.</div>;

  // 포인트 및 예산 계산
  const {
    safePointAmount,
    previewPaidAmount,
    previewReward,
    previewAfterBudget,
    isOverBudgetAfterPoints,
  } = pointCalculate({
    pointBalance,
    pointAmount,
    requestAmount: data.requestAmount,
    shippingFee: data.shippingFee ?? 0,
    remainedBudget: data.remained ?? 0,
  });

  const isApproveBlock = isApprove && isOverBudgetAfterPoints;
  const isShowAlert = isApproveBlock && showAlert;

  const onSubmit = (formData: PurchaseResultFormValues) => {
    mutation.mutate(
      {
        id: requestId,
        resultMessage: formData.resultMessage ?? '',
        requestPointAmount: isApprove ? safePointAmount : 0,
      },
      {
        onSuccess: () => {
          setShowResultModal(true);
        },
        onError: (error) => {
          alert(
            error instanceof ApiError ? error.message : '에러가 발생했습니다.'
          );
        },
      }
    );
  };

  return (
    <>
      {isShowAlert && (
        <div className="fixed left-1/2 top-6 z-[60] w-[calc(100%-3rem)] max-w-[1152px] -translate-x-1/2">
          <Toast
            onClose={() => setShowAlert(false)}
            remainingBudget={data.remained.toLocaleString()}
          />
        </div>
      )}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="purchase-request-approval-title"
        className="flex w-[600px] max-h-[90vh] flex-col items-center gap-8 rounded-[2px] bg-white px-[60px] py-10 shadow-[0_0_20px_rgba(0,0,0,0.1)] max-sm:w-full max-sm:max-h-full max-sm:gap-0 max-sm:px-0 max-sm:py-0 max-sm:shadow-none"
      >
        <h2
          id="purchase-request-approval-title"
          className="text-[18px] font-bold tracking-[-0.45px] text-gray-950 max-sm:px-2 max-sm:py-4"
        >
          {isApprove ? '구매 요청 승인' : '구매 요청 반려'}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-9 max-sm:gap-8 max-sm:px-6 max-sm:pb-[112px] overflow-y-auto"
        >
          <div className="flex w-full flex-col">
            <div className="flex w-full flex-col gap-8 pb-5">
              <div className="flex items-center gap-3">
                <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-50">
                  <span className="text-[10px] font-medium tracking-[-0.25px] text-black">
                    {getInitials(data.requesterName)}
                  </span>
                </div>
                <p className="w-16 text-[16px] font-bold tracking-[-0.4px] text-gray-950">
                  {data?.requesterName}
                </p>
              </div>

              <div className="flex items-center gap-1.5 tracking-[-0.4px] text-gray-950">
                <p className="text-[16px] font-bold">요청 품목</p>
                <p className="text-[16px] max-sm:text-[14px] max-sm:tracking-[-0.35px]">
                  총 {data?.items?.length ?? 0}개
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-8">
              <div className="flex w-full flex-col gap-5 rounded-[2px] bg-white px-5 pb-[30px] pt-5 shadow-[0_0_5px_rgba(0,0,0,0.12)]">
                <ul className="flex w-full flex-col">
                  {data?.items?.map((item) => (
                    <li
                      key={item.id}
                      className="flex w-full items-center justify-between border-b border-solid border-gray-100 py-5 pr-2"
                    >
                      <div className="flex items-center gap-5 max-sm:gap-3">
                        <div className="relative flex size-10 shrink-0 items-center justify-center bg-white shadow-[4px_4px_10px_rgba(250,247,243,0.25)]">
                          <div className="relative h-[35px] w-5">
                            {item.imageUrl ? (
                              <Image
                                src={item.imageUrl}
                                alt={item.productName}
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <span className="text-xs text-gray-500">
                                이미지 없음
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2.5 text-[16px] tracking-[-0.4px] text-gray-900 max-sm:gap-1 max-sm:text-[14px] max-sm:tracking-[-0.35px]">
                          <p className="font-medium max-sm:font-normal">
                            {item.productName}
                          </p>
                          <p className="font-bold">
                            {item.price.toLocaleString()}원
                          </p>
                        </div>
                      </div>

                      <p className="text-[16px] font-bold text-gray-500 max-sm:hidden">
                        수량 {item.quantity} 개
                      </p>

                      <p className="text-center text-[20px] font-extrabold leading-8 text-gray-700 max-sm:hidden">
                        {item.totalPrice.toLocaleString()}원
                      </p>

                      <div className="hidden flex-col items-start justify-center gap-1 max-sm:flex">
                        <p className="text-[13px] font-bold tracking-[-0.325px] text-gray-500">
                          {item.quantity}
                        </p>
                        <p className="text-center text-[16px] font-bold tracking-[-0.4px] text-gray-700">
                          {item.totalPrice.toLocaleString()}원
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex w-full flex-col gap-2.5">
                  <div className="flex w-full items-center justify-between px-2 text-[16px] font-bold tracking-[-0.4px] text-gray-700">
                    <p>주문금액</p>
                    <p>{data.orderAmount.toLocaleString()}원</p>
                  </div>
                  <div className="flex w-full items-center justify-between px-2 text-[16px] font-bold tracking-[-0.4px] text-gray-700">
                    <p>배송비</p>
                    <p>{data.shippingFee.toLocaleString()}원</p>
                  </div>
                  {isApprove && (
                    <>
                      <div className="flex w-full flex-col gap-3 rounded-[2px] bg-white p-6 shadow-[0_0_5px_rgba(0,0,0,0.12)]">
                        <div className="flex w-full items-center justify-end gap-2">
                          {errors.pointAmount && (
                            <p className="text-right text-[13px] text-red-500">
                              {errors.pointAmount.message}
                            </p>
                          )}
                          <Controller
                            name="pointAmount"
                            control={control}
                            render={({ field }) => (
                              <input
                                type="number"
                                aria-label="사용 포인트"
                                min={0}
                                max={maxPoint}
                                value={field.value}
                                onFocus={(e) => e.target.select()}
                                onChange={(e) => {
                                  const raw = e.target.value;
                                  if (raw === '') {
                                    field.onChange(0);
                                    return;
                                  }
                                  const num = Number(raw);
                                  if (Number.isNaN(num)) return;
                                  field.onChange(num); // 클램핑 제거
                                }}
                                className="w-24 rounded border border-gray-300 bg-transparent px-2 py-1 text-right text-[14px] outline-none focus:border-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              />
                            )}
                          />

                          <span className="text-[16px] font-bold text-gray-600">
                            {`/ ${maxPoint.toLocaleString()} P`}
                          </span>
                        </div>
                        <div className="flex flex-col items-end gap-1 text-[16px] font-bold text-gray-700">
                          <p>적립 예정: {previewReward.toLocaleString()} P</p>
                          <p className="text-[20px] font-extrabold text-black">
                            실결제액: {previewPaidAmount.toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex w-full items-center justify-between px-2 text-gray-950">
                    <p className="text-[18px] font-bold tracking-[-0.45px] max-sm:text-[16px] max-sm:tracking-[-0.4px]">
                      총 주문금액
                    </p>
                    <p className="text-[24px] font-extrabold tracking-[-0.6px] max-sm:text-[20px] max-sm:tracking-[-0.5px]">
                      {(isApprove
                        ? previewPaidAmount
                        : data.orderAmount + data.shippingFee
                      ).toLocaleString()}
                      원
                    </p>
                  </div>
                </div>
              </div>

              <hr className="w-full border-0 border-t border-solid border-gray-100" />

              <div className="flex w-full items-center justify-between text-gray-950">
                <p className="text-[18px] font-bold tracking-[-0.45px] max-sm:text-[16px] max-sm:tracking-[-0.4px]">
                  남은 예산 금액
                </p>
                <p className="text-[24px] font-extrabold tracking-[-0.6px] max-sm:text-[20px] max-sm:tracking-[-0.5px]">
                  {(isApprove
                    ? previewAfterBudget
                    : data.remained
                  ).toLocaleString()}
                  원
                </p>
              </div>

              <div className="flex w-full flex-col gap-3">
                <p className="text-[16px] font-bold tracking-[-0.4px] text-gray-950">
                  {isApprove ? '승인' : '반려'}메시지
                </p>
                <textarea
                  placeholder={
                    isApprove
                      ? '승인 메시지를 입력해주세요'
                      : '반려 사유를 입력해주세요'
                  }
                  className="h-[140px] w-full resize-none rounded-[2px] border border-solid border-gray-200 bg-white p-6 text-[16px] leading-[1.6] tracking-[-0.4px] text-gray-950 outline-none placeholder:text-gray-400"
                  {...register('resultMessage')}
                />
                {errors.resultMessage && (
                  <p className="text-[13px] text-red-500">
                    {errors.resultMessage.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex w-full items-center gap-5 max-sm:fixed max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:z-10 max-sm:bg-white max-sm:p-6">
            <Button
              variant="line"
              className="min-w-0 flex-1 cursor-pointer"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              variant="filled"
              className="min-w-0 flex-1 cursor-pointer"
              type="submit"
              disabled={
                isApproveBlock ||
                mutation.isPending ||
                !!errors.pointAmount ||
                !!errors.resultMessage
              }
            >
              {isApprove ? '승인하기' : '반려하기'}
            </Button>
          </div>
        </form>
      </div>
      {showResultModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[5px]">
          <AlertModal
            icon={icAlert}
            title={isApprove ? undefined : '요청 반려'}
            content={
              isApprove
                ? undefined
                : `요청이 반려되었어요\n목록에서 다른 요청을 확인해보세요`
            }
            confirmLabel={isApprove ? '확인' : '확인'}
            showCancel={false}
            onConfirm={onClose}
          />
        </div>
      )}
    </>
  );
}
