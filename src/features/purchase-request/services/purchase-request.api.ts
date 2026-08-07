import { apiFetch } from '@/lib/api';
import type {
  CancelPurchaseRequestResponse,
  MyPurchaseRequestDetailResponse,
  MyPurchaseRequestListResponse,
} from '../types/purchase-request.types';

export async function getMyPurchaseRequests(
  page = 1,
  pageSize = 10,
  sortBy = 'recent'
): Promise<MyPurchaseRequestListResponse['data']> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    sortBy,
  });

  return apiFetch<MyPurchaseRequestListResponse['data']>(
    `/purchase-requests/mine?${params.toString()}`,
    {
      cache: 'no-store',
    }
  );
}

export async function getMyPurchaseRequest(
  id: number
): Promise<MyPurchaseRequestDetailResponse['data']> {
  return apiFetch<MyPurchaseRequestDetailResponse['data']>(
    `/purchase-requests/mine/${id}`,
    {
      cache: 'no-store',
    }
  );
}

export async function cancelMyPurchaseRequest(
  id: number
): Promise<CancelPurchaseRequestResponse['data']> {
  return apiFetch<CancelPurchaseRequestResponse['data']>(
    `/purchase-requests/${id}/cancel`,
    {
      method: 'POST',
    }
  );
}
