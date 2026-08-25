import { z } from 'zod';

export const createPurchaseSchema = (
  pointBalance: number,
  totalAmount: number
) =>
  z
    .object({
      requestPointAmount: z
        .number({ error: '숫자를 입력해주세요.' })
        .int('정수만 입력해주세요.')
        .min(0, '0 이상이어야 합니다.')
        .max(
          pointBalance,
          `${pointBalance.toLocaleString('ko-KR')} P 이하로 입력해주세요.`
        ),
    })
    .refine((v) => v.requestPointAmount <= totalAmount, {
      message: '결제 금액을 초과할 수 없습니다.',
      path: ['requestPointAmount'],
    });

export type CreatePurchaseFormValues = z.infer<
  ReturnType<typeof createPurchaseSchema>
>;
