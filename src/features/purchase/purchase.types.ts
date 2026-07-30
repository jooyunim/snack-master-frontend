export type OrderSort = 'latest' | 'amountAsc' | 'amountDesc';

export type OrderListItem = {
  id: number;
  requestedAt: string;
  resolvedAt: string | null;
  requesterName: string;
  resolverName: string | null;
  productName: string;
  totalAmount: number;
  shippingFee: number;
  status: string;
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
  status: string;
  requester: { id: string; name: string; email: string };
  resolver: { id: string; name: string } | null;
  requestMessage: string | null;
  resultMessage: string | null;
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
