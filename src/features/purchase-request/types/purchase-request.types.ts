export type RequestStatus = 'pending' | 'approved' | 'rejected';

export type PurchaseRequest = {
  id: number;
  date: string;
  product: string;
  productName: string;
  amount: string;
  status: RequestStatus;
  /** 구매 요청 관리(관리자) 목록용 */
  requesterName?: string;
  requesterInitials?: string;
};
