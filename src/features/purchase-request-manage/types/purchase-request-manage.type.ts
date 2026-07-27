export type sortByOption = 'price_asc' | 'price_desc' | 'recent';


export type purchaseRequestManage = {
    id: number;
    requestedAt: Date;
    totalAmount: number;
    requesterName: string;
    itemSummary: string;
};

export type PurchaseRequestRequester = {
    name: string;
}

export type PurchaseRequestItem = {
    productName: string;
    price: number;
    quantity: number;
    imageUrl: string | null;
}

export type purchaseRequestManageDetail = {
    thisMonthSpent: number;
    remained: number;
    afterBudget: number;
    isOverBudget: boolean;
    items: PurchaseRequestItem[]
    requesterName: PurchaseRequestRequester,
    requestMessage: string,
    requestedAt: Date,
    requestAmount: number,
    id: number,
    status: string
}

export type Action = 'approve' | 'reject'

export type MessageResponse = {
    message: string
}


