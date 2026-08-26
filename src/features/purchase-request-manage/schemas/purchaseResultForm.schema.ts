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
        `${maxPoint.toLocaleString('ko-KR')} P 이하로 입력해주세요.`
      )
      .refine((val) => val <= requestAmount, {
        message: '결제 금액을 초과할 수 없습니다.',
      }),
  });

export type PurchaseResultFormValues = z.infer<
  ReturnType<typeof createPurchaseResultFormSchema>
>;
