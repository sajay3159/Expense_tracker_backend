import { Router } from "express";
const router = Router();
import auth from "../middleware/auth.js";
import {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../controllers/expensesController.js";

router.use(auth);

router.post("/", createExpense);
router.get("/", getExpenses);
router.patch("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
