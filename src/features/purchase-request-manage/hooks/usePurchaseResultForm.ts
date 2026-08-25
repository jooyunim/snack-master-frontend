import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createPurchaseResultFormSchema,
  PurchaseResultFormValues,
} from '../schemas/purchaseResultForm.schema';
import { useMemo } from 'react';

export function usePurchaseResultForm(maxPoint: number) {
  const resolver = useMemo(
    () => zodResolver(createPurchaseResultFormSchema(maxPoint)),
    [maxPoint]
  );

  return useForm<PurchaseResultFormValues>({
    resolver,
    defaultValues: { resultMessage: '', pointAmount: 0 },
  });
}
