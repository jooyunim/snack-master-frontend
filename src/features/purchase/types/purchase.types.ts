export type OrderStatus =
  'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED' | 'REFUNDED';

export type OrderSort = 'latest' | 'amountAsc' | 'amountDesc';

export type OrderListItem = {
  id: number;
  requestedAt: string;
  resolvedAt: string | null;
  refundedAt?: string | null;
  requesterName: string;
  resolverName: string | null;
  items: { productName: string }[];
  totalQuantity: number;
  totalAmount: number;
  shippingFee: number;
  status: OrderStatus;
};

export type OrdersResponse = {
  orders: OrderListItem[];
  total: number;
  page: number;
  pageSize: number;
};

export type OrderDetail = {
  id: number;
  requestedAt: string;
  resolvedAt: string | null;
  status: OrderStatus;
  requester: { id: string; name: string; email: string };
  resolver: { id: string; name: string } | null;
  requestMessage: string | null;
  resultMessage: string | null;
  refundReason?: string | null;
  refundedAt?: string | null;
  shippingFee: number;
  pointsUsed: number;
  totalAmount: number;
  items: {
    id: number;
    productName: string;
    price: number;
    imageUrl: string;
    quantity: number;
  }[];
  pointsEarned: number;
  paidAmount: number;
};

export type DashboardSummary = {
  /** 이번 달 예산 (카드 1) — 남은 예산 아님 */
  currentMonthBudget: number;
  /** 지난 달 예산 (카드 1 하단) */
  lastMonthBudget: number;
  /** 이번 달 남은 예산 (호버) */
  remainingBudget: number;
  /** 지난 달 남은 예산 (호버) — 없으면 null */
  lastMonthRemaining: number | null;
  thisMonthExpense: number;
  lastMonthExpense: number;
  thisYearExpense: number;
  lastYearExpense: number;
};

export type ApiSuccess<T> = { success: boolean; data: T };
