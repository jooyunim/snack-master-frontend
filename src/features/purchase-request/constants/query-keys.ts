export const purchaseRequestKeys = {
  all: ['purchase-requests'] as const,
  myLists: () => [...purchaseRequestKeys.all, 'my', 'list'] as const,
  myList: () => [...purchaseRequestKeys.myLists()] as const,
  manageLists: () => [...purchaseRequestKeys.all, 'manage', 'list'] as const,
  manageList: () => [...purchaseRequestKeys.manageLists()] as const,
  details: () => [...purchaseRequestKeys.all, 'detail'] as const,
  detail: (id: number) => [...purchaseRequestKeys.details(), id] as const,
};
