import { Router } from "express";
import { getAllTransactions } from "../controllers/transaction.controller";

const router = Router();

router.get("/", getAllTransactions);

export default router;
