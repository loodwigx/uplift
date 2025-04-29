import { Router } from "express";
import { handleEvaluationReq } from "./claimEvaluation.ts";
const router = Router();

router.put("/", handleEvaluationReq);

export default router;
