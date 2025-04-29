import type { Request, Response, NextFunction } from "express";
import type Claim from "./types/Claim.ts";
import { incidentTypes } from "./types/Claim.ts";
import type Evaluation from "./types/Evaluation.ts";
import { reasonCodes } from "./types/Evaluation.ts";
import type Policy from "./types/Policy.ts";
import { getPolicy } from "./policyUtility.ts";

export const valiadteClaimFormat = (claim: Claim): boolean => {
  return !!( 
    typeof claim.policyId === "string" &&
    Object.values(incidentTypes).includes(claim.incidentType) &&
    claim.incidentDate instanceof Date &&
    typeof claim.amountClaimed === "number"
  );
}

export const handleEvaluationReq = (req: Request, res: Response, next: NextFunction) => {
  try {
    // coerce incidentDate from String to Date in instantiation
    const claim = {...req.body, incidentDate: new Date(req.body.incidentDate)};
    if (valiadteClaimFormat(claim)) {
      const evaluation: Evaluation = performEvaluation(claim);
      if (!evaluation) {
        // TODO - I'm speculating, since we don't have a status code for policy id not found,
        // that we can return a 404 in this case. In the real world, I'd get clarification
        // on requirements and recommend a new reasonCode for the api
        res.status(404).json();
      } else {
        res.status(200).json(evaluation);
      }
    } else {
      res.status(400).json();
    }
  } catch (error) {
    next(error);
  }
};

export const performEvaluation = (claim: Claim): Evaluation => {
  const policy: Policy = getPolicy(claim.policyId);
  if (policy) {
    if (claim.incidentDate < policy.startDate || claim.incidentDate > policy.endDate) {
      return { approved: false, payout: 0, reasonCode: reasonCodes.POLICY_INACTIVE };
    }
    
    if (!policy.coveredIncidents.includes(claim.incidentType)) {
      return { approved: false, payout: 0, reasonCode: reasonCodes.NOT_COVERED };
    }
    
    const payout = Math.min(claim.amountClaimed - policy.deductible, policy.coverageLimit);
    if (payout <= 0) {
      return { approved: false, payout: 0, reasonCode: reasonCodes.ZERO_PAYOUT };
    }

    return { approved: true, payout, reasonCode: reasonCodes.APPROVED }
  }
  return null;
};
