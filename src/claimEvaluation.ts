import type { Request, Response, NextFunction } from "express";
import type Claim from "./types/Claim.ts";
import type Evaluation from "./types/Evaluation.ts";
export const handleEvaluationReq = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(418).json();
  } catch (error) {
    next(error);
  }
};


export const performEvaluation = (claim: Claim): Evaluation => {
  // TODO - flesh all of this out once we have tests
  return null;
};
