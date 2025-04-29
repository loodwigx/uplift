import type { Request, Response, NextFunction } from "express";
export const handleEvaluationReq = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(418).json();
  } catch (error) {
    next(error);
  }
};

export const performEvaluation = (claim) => {
  // TODO - flesh all of this out once we have tests
  return null;
};
