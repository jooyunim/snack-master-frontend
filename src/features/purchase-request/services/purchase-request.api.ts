// BE 연동 시 참고용 fetch 호출 예시

import type { PurchaseRequest } from '../types/purchase-request.types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

/** 내가 요청한 구매요청 목록 (USER+) */
export async function getMyPurchaseRequests(): Promise<PurchaseRequest[]> {
  const response = await fetch(`${API_BASE}/purchase-requests/me`, {
    cache: 'no-store',
  });
  return response.json();
}

/** 전체 구매요청 목록 (ADMIN+) */
export async function getAllPurchaseRequests(): Promise<PurchaseRequest[]> {
  const response = await fetch(`${API_BASE}/purchase-requests`, {
    cache: 'no-store',
  });
  return response.json();
}

export async function getPurchaseRequestById(
  id: number,
): Promise<PurchaseRequest> {
  const response = await fetch(`${API_BASE}/purchase-requests/${id}`, {
    cache: 'no-store',
  });
  return response.json();
}
