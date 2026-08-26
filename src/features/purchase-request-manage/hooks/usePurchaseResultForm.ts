import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createPurchaseResultFormSchema,
  PurchaseResultFormValues,
} from '../schemas/purchaseResultForm.schema';

export function usePurchaseResultForm(maxPoint: number, requestAmount: number) {
  const resolver = useMemo(
    () => zodResolver(createPurchaseResultFormSchema(maxPoint, requestAmount)),
    [maxPoint, requestAmount]
  );

  return useForm<PurchaseResultFormValues>({
    resolver,
    defaultValues: {
      resultMessage: '',
      pointAmount: 0,
    },
  });
}
