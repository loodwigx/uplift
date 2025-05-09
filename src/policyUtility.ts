import type Policy from "./types/Policy.ts";

const examplePolicies: Policy[] = [
  {
    policyId: "POL123",
    startDate: new Date("2023-01-01"),
    endDate: new Date("2024-01-01"),
    deductible: 500,
    coverageLimit: 10000,
    coveredIncidents: ["accident", "fire"],
  },
  {
    policyId: "POL456",
    startDate: new Date("2022-06-01"),
    endDate: new Date("2025-06-01"),
    deductible: 250,
    coverageLimit: 50000,
    coveredIncidents: ["accident", "theft", "fire", "water damage"],
  },
];

export const getPolicy = (id: string): Policy => examplePolicies.find((p) => p.policyId === id) ?? null;
