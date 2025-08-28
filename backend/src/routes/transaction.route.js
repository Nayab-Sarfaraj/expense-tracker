import { Router } from "express"
import { addTransaction, deleteTransaction, getTransactionSummary, getUserTransactions } from "../controller/transaction.controller.js";
const router = Router()


router.post("/", addTransaction);

router.get("/:userId", getUserTransactions);
router.delete("/:transactionId", deleteTransaction);

router.get("/summary/:userId", getTransactionSummary);

export default router