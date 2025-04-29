import type { Request, Response, NextFunction } from "express";
import type Claim from "./types/Claim.ts";
import type Evaluation from "./types/Evaluation.ts";
export const valiadteClaimFormat = (claim: Claim): boolean => {
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
  // TODO - flesh all of this out once we have tests
  return null;
};
