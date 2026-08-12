export type sortByOption = 'price_asc' | 'price_desc' | 'recent';

export type purchaseRequestManage = {
  id: number;
  requestedAt: string;
  totalAmount: number;
  requesterName: string;
  itemSummary: string;
};

export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type purchaseRequestManageList = {
  items: purchaseRequestManage[];
  pagination: Pagination;
};

export type PurchaseRequestItem = {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
  totalPrice: number;
};

export type purchaseRequestManageDetail = {
  thisMonthSpent: number;
  remained: number;
  afterBudget: number;
  isOverBudget: boolean;
  orderAmount: number;
  shippingFee: number;
  items: PurchaseRequestItem[];
  requesterName: string;
  requestMessage: string;
  requestedAt: string;
  requestAmount: number;
  id: number;
  status: string;
};

export type Action = 'approve' | 'reject';

// BE approveRequest/rejectRequest 응답의 공통 형태.
// approveRequest는 pointUsed/reward/paidAmount를 더 포함하지만, 지금 FE는
// 두 경우 모두 id/status 외엔 안 읽어서 공통 필드만 타입에 반영함.
export type PurchaseRequestStatusResult = {
  id: number;
  status: string;
};

export type ModalState = {
  requestId: number;
  action: 'approve' | 'reject';
};
