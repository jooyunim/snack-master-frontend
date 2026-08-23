import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createPurchaseResultFormSchema,
  PurchaseResultFormValues,
} from '../schemas/purchaseResultForm.schema';

export function usePurchaseResultForm(maxPoint: number) {
  return useForm<PurchaseResultFormValues>({
    resolver: zodResolver(createPurchaseResultFormSchema(maxPoint)),
    defaultValues: { resultMessage: '', pointAmount: 0 },
  });
}
