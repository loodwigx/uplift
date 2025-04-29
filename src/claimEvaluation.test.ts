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

  test("Inactive Claim", () => {
    const early = performEvaluation({
      policyId: "POL123",
      incidentType: "fire",
      incidentDate: new Date("2021-01-01"),
      amountClaimed: 3000
    });
    expect(early.approved).toBe(false);
    expect(early.payout).toBe(0);
    expect(early.reasonCode).toBe(reasonCodes.POLICY_INACTIVE);

    const onTime = performEvaluation({
      policyId: "POL123",
      incidentType: "fire",
      incidentDate: new Date("2023-06-15"),
      amountClaimed: 3000
    });
    expect(onTime.approved).toBe(true);
    expect(onTime.payout).toBe(2500);
    expect(onTime.reasonCode).toBe(reasonCodes.APPROVED);

    const late = performEvaluation({
      policyId: "POL123",
      incidentType: "fire",
      incidentDate: new Date("2026-01-01"),
      amountClaimed: 3000
    });
    expect(late.approved).toBe(false);
    expect(late.payout).toBe(0);
    expect(late.reasonCode).toBe(reasonCodes.POLICY_INACTIVE);
  });

  test("Coverage Type", () => {
    const fire = performEvaluation({
      policyId: "POL123",
      incidentType: "fire",
      incidentDate: new Date("2023-04-29"),
      amountClaimed: 3000
    });
    expect(fire.approved).toBe(true);
    expect(fire.payout).toBe(2500);
    expect(fire.reasonCode).toBe(reasonCodes.APPROVED);

    const theft = performEvaluation({
      policyId: "POL123",
      incidentType: "theft",
      incidentDate: new Date("2023-04-29"),
      amountClaimed: 3000
    });
    expect(theft.approved).toBe(false);
    expect(theft.payout).toBe(0);
    expect(theft.reasonCode).toBe(reasonCodes.NOT_COVERED);
  });

  test("Payout", () => {
    const major = performEvaluation({
      policyId: "POL123",
      incidentType: "fire",
      incidentDate: new Date("2023-04-29"),
      amountClaimed: 5500
    });
    expect(major.approved).toBe(true);
    expect(major.payout).toBe(5000);
    expect(major.reasonCode).toBe(reasonCodes.APPROVED);

    const minor = performEvaluation({
      policyId: "POL123",
      incidentType: "fire",
      incidentDate: new Date("2023-04-29"),
      amountClaimed: 55
    });
    expect(minor.approved).toBe(false);
    expect(minor.payout).toBe(0);
    expect(minor.reasonCode).toBe(reasonCodes.ZERO_PAYOUT);

    const colossal = performEvaluation({
      policyId: "POL123",
      incidentType: "fire",
      incidentDate: new Date("2023-04-29"),
      amountClaimed: 42000
    });
    expect(colossal.approved).toBe(true);
    expect(colossal.payout).toBe(10000);
    expect(colossal.reasonCode).toBe(reasonCodes.APPROVED);
  });
});
