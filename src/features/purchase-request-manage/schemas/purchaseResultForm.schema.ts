import { z } from 'zod';

export const createPurchaseResultFormSchema = (
  maxPoint: number,
  requestAmount: number
) =>
  z.object({
    resultMessage: z
      .string()
      .max(100, '메시지는 100자 이내로 입력해주세요.')
      .optional(),
    pointAmount: z
      .number()
      .min(0, '포인트는 0 이상이어야 합니다.')
      .max(
        maxPoint,
        `보유 포인트(${maxPoint.toLocaleString()}P)를 초과했습니다.`
      )
      .refine((val) => val <= requestAmount, {
        message: `결제 금액(${requestAmount.toLocaleString()}원)보다 많은 포인트를 사용할 수 없습니다.`,
      }),
  });

export type PurchaseResultFormValues = z.infer<
  ReturnType<typeof createPurchaseResultFormSchema>
>;
