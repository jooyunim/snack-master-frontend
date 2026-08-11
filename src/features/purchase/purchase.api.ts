import { apiFetch } from '@/lib/api';
import type {
  DashboardSummary,
  OrderDetail,
  OrderSort,
  OrdersResponse,
} from './purchase.types';

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
  return apiFetch<OrdersResponse>(`/orders?${qs}`);
}

export function getOrderById(id: number) {
  return apiFetch<OrderDetail>(`/orders/${id}`);
}

export function getDashboardSummary() {
  return apiFetch<DashboardSummary>('/dashboard/summary');
}
