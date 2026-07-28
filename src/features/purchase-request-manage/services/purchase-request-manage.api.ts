import { Action, MessageResponse, purchaseRequestManage, purchaseRequestManageDetail, sortByOption } from "../../types/purchase-request-manage.type";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export async function getPurchaseRequestManageList(
    sortBy?: sortByOption
): Promise<purchaseRequestManage[]> {
    const query = sortBy ? `?sortBy=${sortBy}` : ``;
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_BASE}/purchase-requests/${query}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }, credentials: 'include'
    },

    );
    return response.json();
}

export async function getPurchaseRequestManageDetail(id: number): Promise<purchaseRequestManageDetail> {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_BASE}/purchase-requests/${id}`, {
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }, credentials: 'include'
    });
    return response.json();
}

async function patchStatus(id: number, resultMessage: string, action: Action): Promise<MessageResponse> {
    const token = localStorage.getItem("accessToken")
    const response = await fetch(`${API_BASE}/purchase-requests/${id}/${action}`, {
        method: 'PATCH',
        body: JSON.stringify({ resultMessage }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }, credentials: 'include',
        cache: 'no-store'
    });
    return response.json();
}

export const patchApprove = async (id: number, resultMessage: string) => patchStatus(id, resultMessage, 'approve');
export const patchReject = async (id: number, resultMessage: string) => patchStatus(id, resultMessage, 'reject');