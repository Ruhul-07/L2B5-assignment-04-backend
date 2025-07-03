import { Router } from "express"
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/bookController"
import { validateBookInput, validateObjectId } from "../middleware/validation"

const router = Router()

// GET /api/books - Get all books
router.get("/", getAllBooks)

// GET /api/books/:id - Get single book
router.get("/:id", validateObjectId, getBookById)

// POST /api/books - Create new book
router.post("/", validateBookInput, createBook)

// PUT /api/books/:id - Update book
router.put("/:id", validateObjectId, validateBookInput, updateBook)

// DELETE /api/books/:id - Delete book
router.delete("/:id", validateObjectId, deleteBook)

export default router
