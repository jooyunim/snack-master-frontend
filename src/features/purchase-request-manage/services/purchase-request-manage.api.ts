import { apiFetch } from '@/lib/api';
import {
  Action,
  MessageResponse,
  purchaseRequestManageDetail,
  purchaseRequestManageListResponse,
  sortByOption,
} from '../types/purchase-request-manage.type';

export async function getPurchaseRequestManageList(
  sortBy?: sortByOption,
  page: number = 1,
  pageSize: number = 10
): Promise<purchaseRequestManageListResponse> {
  const params = new URLSearchParams();
  if (sortBy) params.set('sortBy', sortBy);
  params.set('page', String(page));
  params.set('pageSize', String(pageSize));
  return apiFetch<purchaseRequestManageListResponse>(
    `/purchase-requests?${params}`
  );
}

export async function getPurchaseRequestManageDetail(
  id: number
): Promise<purchaseRequestManageDetail> {
  return apiFetch<purchaseRequestManageDetail>(`/purchase-requests/${id}`);
}

async function patchStatus(
  id: number,
  resultMessage: string,
  action: Action,
  requestPointAmount?: number
): Promise<MessageResponse> {
  return apiFetch<MessageResponse>(`/purchase-requests/${id}/${action}`, {
    method: 'PATCH',
    body: JSON.stringify({ resultMessage, requestPointAmount }),
  });
}

export const patchApprove = async ({
  id,
  resultMessage,
  requestPointAmount,
}: {
  id: number;
  resultMessage: string;
  requestPointAmount: number;
}) => patchStatus(id, resultMessage, 'approve', requestPointAmount);
export const patchReject = async (id: number, resultMessage: string) =>
  patchStatus(id, resultMessage, 'reject');
