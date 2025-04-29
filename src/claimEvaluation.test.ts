import { reasonCodes } from "./types/Evaluation.ts";
import { performEvaluation, valiadteClaimFormat } from "./claimEvaluation.ts";

describe("Validate Claim Format", () => {
  test("Legitimate Claim", () => {
    const legit = {
      policyId: "POL123",
      incidentType: "fire",
      incidentDate: new Date("2023-06-15"),
      amountClaimed: 3000
    }
    expect(valiadteClaimFormat(legit)).toBe(true);
  });

  test("Bogus id", () => {
    const bogus = {
      policyId: 123,
      incidentType: "fire",
      incidentDate: new Date("2023-06-15"),
      amountClaimed: 3000
    }
    expect(valiadteClaimFormat(bogus)).toBe(false);
  });

  test("Bogus type", () => {
    const bogus = {
      policyId: "POL123",
      incidentType: "tornado",
      incidentDate: new Date("2023-06-15"),
      amountClaimed: 3000
    }
    expect(valiadteClaimFormat(bogus)).toBe(false);
  });

  test("Bogus date", () => {
    const bogus = {
      policyId: "POL123",
      incidentType: "fire",
      incidentDate: 0,
      amountClaimed: 3000
    }
    expect(valiadteClaimFormat(bogus)).toBe(false);
  });

  test("Bogus amount", () => {
    const bogus = {
      policyId: "POL123",
      incidentType: "fire",
      incidentDate: 0,
      amountClaimed: "A decent amount"
    }
    expect(valiadteClaimFormat(bogus)).toBe(false);
  });
});

describe("Perform Evaluation", () => {
  test("Perfect Claim", () => {
    const evaluation = performEvaluation({
      policyId: "POL123",
      incidentType: "fire",
      incidentDate: new Date("2023-06-15"),
      amountClaimed: 3000
    });
    expect(evaluation.approved).toBe(true);
    expect(evaluation.payout).toBe(2500);
    expect(evaluation.reasonCode).toBe(reasonCodes.APPROVED);
  });
});
