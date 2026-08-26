/**
 * 기존 목록 화면 목업용 타입
 * 실제 API 연결이 끝나면 제거할 예정
 */
export type RequestStatus = 'pending' | 'approved' | 'rejected';

export type PurchaseRequest = {
  id: number;
  date: string;
  product: string;
  productName: string;
  amount: string;
  status: RequestStatus;
  requesterName?: string;
  requesterInitials?: string;
};

/**
 * 실제 백엔드 구매 요청 상태
 */
export type PurchaseRequestStatus =
  'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED' | 'REFUNDED';

/**
 * 구매 요청에 포함된 상품
 */
export type PurchaseRequestItem = {
  id: number;
  productId: number;
  productName: string;
  imageUrl: string;
  price: number;
  quantity: number;
};

/**
 * 내 구매 요청 목록의 개별 항목
 */
export type MyPurchaseRequestListItem = {
  id: number;
  status: PurchaseRequestStatus;
  requestMessage: string | null;
  resultMessage: string | null;
  shippingFee: number;
  pointsUsed: number;
  totalAmount: number;
  requestedAt: string;
  resolvedAt: string | null;
  refundedAt: string | null;
  items: PurchaseRequestItem[];
};

/**
 * 페이지네이션 정보
 */
export type PaginationInfo = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

/**
 * GET /purchase-requests/mine 응답
 */
export type MyPurchaseRequestListResponse = {
  success: boolean;
  data: {
    purchaseRequests: MyPurchaseRequestListItem[];
    pagination: PaginationInfo;
  };
};

// 상세품목
export type PurchaseRequestDetailItem = PurchaseRequestItem & {
  lineTotal: number;
};

/**
 * 요청자 또는 처리 담당자
 */
export type PurchaseRequestUser = {
  id: string;
  name: string;
};

/**
 * 내 구매 요청 상세 데이터
 */
export type MyPurchaseRequestDetail = {
  id: number;
  status: PurchaseRequestStatus;

  items: PurchaseRequestDetailItem[];

  summary: {
    itemCount: number;
    totalQuantity: number;
    productAmount: number;
    shippingFee: number;
    pointsUsed: number;
    totalAmount: number;
  };

  requestInfo: {
    requestedAt: string;
    requester: PurchaseRequestUser;
    message: string | null;
  };

  resolutionInfo: {
    resolvedAt: string | null;
    resolver: PurchaseRequestUser | null;
    refundedBy?: PurchaseRequestUser | null;
    refundedAt?: string | null;
    refundReason?: string | null;
    status: PurchaseRequestStatus;
    message: string | null;
  };
};

/**
 * GET /purchase-requests/mine/:id 응답
 */
export type MyPurchaseRequestDetailResponse = {
  success: boolean;
  data: MyPurchaseRequestDetail;
};

/**
 * POST /purchase-requests/:id/cancel 응답
 */
export type CancelPurchaseRequestResponse = {
  success: boolean;
  data: MyPurchaseRequestListItem;
};
