export const incidentTypes = {
  ACCIDENT: "accident",
  THEFT: "theft",
  FIRE: "fire",
  WATER_DAMAGE: "water damage",
} as const;

export type incidentType = typeof incidentTypes[keyof typeof incidentTypes];

export default interface Claim {
  policyId: string;
  incidentType: string;
  incidentDate: Date;
  amountClaimed: number;
}
