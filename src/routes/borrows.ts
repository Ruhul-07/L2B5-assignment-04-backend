import { Router } from "express"
import { borrowBook, getBorrowSummary, getAllBorrows } from "../controllers/borrowController"
import { validateBorrowInput } from "../middleware/validation"

const router = Router()

// POST /api/borrows - Borrow a book
router.post("/", validateBorrowInput, borrowBook)

// GET /api/borrows/summary - Get borrow summary
router.get("/summary", getBorrowSummary)

// GET /api/borrows - Get all borrows
router.get("/", getAllBorrows)

export default router
