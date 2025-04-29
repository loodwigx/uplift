import { Router } from "express";
const router = Router();

router.get("/", () => console.log("hello world"));

export default router;
