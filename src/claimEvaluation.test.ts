import { reasonCodes } from "./types/Evaluation.ts";
import { performEvaluation, valiadteClaimFormat } from "./claimEvaluation.ts";

describe("Validate Claim Format", () => {
  test("Legitimate Claim", () => {
  });

  test("Bogus id", () => {
  });

  test("Bogus type", () => {
  });

  test("Bogus date", () => {
  });

  test("Bogus amount", () => {
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
