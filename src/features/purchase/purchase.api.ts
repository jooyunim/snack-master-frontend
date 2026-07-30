import type {
  ApiSuccess,
  DashboardSummary,
  OrderDetail,
  OrderSort,
  OrdersResponse,
} from './purchase.types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

function getAccessToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

async function apiFetch<T>(path: string): Promise<T> {
  const token = getAccessToken();
  const res = await fetch(`${API_BASE}${path}`, {
    cache: 'no-store',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error(`API Error ${res.status}`);
  const json = (await res.json()) as ApiSuccess<T>;
  return json.data;
}

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
