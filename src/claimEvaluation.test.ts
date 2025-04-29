import { performEvaluation } from "./claimEvaluation.ts";
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
    expect(evaluation.reasonCode).toBe("APPROVED");
  });
});
