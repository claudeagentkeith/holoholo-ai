import { PLANNING_DEPOSIT_DOLLARS } from "@/lib/constants";

export const SERVICE_FEE_RATE = Number(process.env.NEXT_PUBLIC_SERVICE_FEE_RATE ?? 0.15);

export function getPlanningDepositAmount() {
  return PLANNING_DEPOSIT_DOLLARS;
}

export function roundCurrency(amount: number) {
  return Number(amount.toFixed(2));
}

export function sumSupplierAmounts(
  items: Array<{
    supplierEstimatedSubtotal?: number | null;
  }>
) {
  return roundCurrency(items.reduce((sum, item) => sum + Number(item.supplierEstimatedSubtotal ?? 0), 0));
}

export function sumFeeEligibleAmounts(
  items: Array<{
    supplierEstimatedSubtotal?: number | null;
    feeEligible?: boolean | null;
  }>
) {
  return roundCurrency(
    items.reduce((sum, item) => sum + (item.feeEligible ? Number(item.supplierEstimatedSubtotal ?? 0) : 0), 0)
  );
}

export function computeVersionPricing(input: {
  items: Array<{
    supplierEstimatedSubtotal?: number | null;
    feeEligible?: boolean | null;
  }>;
  depositAmount: number;
}) {
  const supplierSubtotal = sumSupplierAmounts(input.items);
  const serviceFeeBase = sumFeeEligibleAmounts(input.items);
  const serviceFeeAmount = roundCurrency(serviceFeeBase * SERVICE_FEE_RATE);
  const depositCreditApplied = Math.min(serviceFeeAmount, input.depositAmount);
  const serviceFeeBalanceDue = roundCurrency(serviceFeeAmount - depositCreditApplied);
  const allInEstimatedTotal = roundCurrency(supplierSubtotal + serviceFeeAmount);

  return {
    supplierSubtotal,
    serviceFeeBase,
    serviceFeeRate: SERVICE_FEE_RATE,
    serviceFeeAmount,
    depositCreditApplied,
    serviceFeeBalanceDue,
    allInEstimatedTotal
  };
}
