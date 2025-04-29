export const reasonCodes = {
  APPROVED: "APPROVED",
  POLICY_INACTIVE: "POLICY_INACTIVE",
  NOT_COVERED: "NOT_COVERED",
  ZERO_PAYOUT: "ZERO_PAYOUT",
} as const;

export type ReasonCode = typeof reasonCodes[keyof typeof reasonCodes];

export default interface Evaluation {
  approved: boolean;
  payout: number;
  reasonCode: string;
}
