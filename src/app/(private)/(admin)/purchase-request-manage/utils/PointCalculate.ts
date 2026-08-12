export interface PurchaseCalculationParams {
  pointBalance: number;
  pointAmount: number;
  requestAmount: number;
  shippingFee: number;
  remainedBudget: number;
}

export interface PurchaseCalculationResult {
  maxPoint: number;
  safePointAmount: number;
  previewPaidAmount: number;
  previewReward: number;
  previewAfterBudget: number;
  isOverBudgetAfterPoints: boolean;
}

const PointCalculate = ({
  pointBalance,
  pointAmount,
  requestAmount,
  shippingFee,
  remainedBudget,
}: PurchaseCalculationParams): PurchaseCalculationResult => {
  const maxPoint = Math.min(pointBalance, requestAmount);
  const safePointAmount = Number.isFinite(pointAmount)
    ? Math.min(Math.max(pointAmount, 0), maxPoint)
    : 0;
  const previewPaidAmount = Math.max(requestAmount - safePointAmount, 0);
  const previewReward = Math.floor(
    Math.max(previewPaidAmount - shippingFee, 0) * 0.01
  );
  const previewAfterBudget = remainedBudget - previewPaidAmount;
  const isOverBudgetAfterPoints = previewAfterBudget < 0;

  return {
    maxPoint,
    safePointAmount,
    previewPaidAmount,
    previewReward,
    previewAfterBudget,
    isOverBudgetAfterPoints,
  };
};

export default PointCalculate;
