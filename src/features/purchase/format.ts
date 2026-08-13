import type { OrderStatus } from './purchase.types';

export function formatWon(amount?: number | null) {
  return `${(amount ?? 0).toLocaleString('ko-KR')}원`;
}

export function formatAmount(amount?: number | null) {
  return (amount ?? 0).toLocaleString('ko-KR');
}

export function formatDate(iso: string | null) {
  if (!iso) return '-';
  const d = new Date(iso);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}. ${m}. ${day}`;
}

export function statusLabel(status: OrderStatus): string {
  switch (status) {
    case 'APPROVED':
      return '승인 완료';
    case 'REJECTED':
      return '구매 반려';
    case 'PENDING':
      return '승인 대기';
    case 'CANCELED':
      return '요청 취소';
    case 'REFUNDED':
      return '환불';
  }
}

export function formatProductName(items: { productName: string }[]) {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0].productName;
  return `${items[0].productName} 외 ${items.length - 1}건`;
}