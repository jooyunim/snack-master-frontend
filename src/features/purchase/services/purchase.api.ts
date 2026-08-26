import { apiFetch } from '@/lib/api';
import type {
  DashboardSummary,
  OrderDetail,
  OrderSort,
  OrdersResponse,
} from '../types/purchase.types';

export function getOrders(params?: {
  page?: number;
  pageSize?: number;
  sort?: OrderSort;
}) {
  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 10;
  const sort = params?.sort ?? 'latest';
  const qs = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    sort,
  });
  return apiFetch<OrdersResponse>(`/orders?${qs}`, {
    cache: 'no-store',
  });
}

export function getOrderById(id: number) {
  return apiFetch<OrderDetail>(`/orders/${id}`, {
    cache: 'no-store',
  });
}

export function getDashboardSummary() {
  return apiFetch<DashboardSummary>('/dashboard/summary');
}

export function refundOrder(id: number, refundReason: string) {
  return apiFetch<{
    id: number;
    status: 'REFUNDED';
    paidAmount: number;
    pointsUsedRestored: number;
    earnRevoked: number;
  }>(`/refunds/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ refundReason }),
  });
}
