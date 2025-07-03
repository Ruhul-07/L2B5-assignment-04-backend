import type { Request, Response, NextFunction } from "express"
import { AppError } from "./errorHandler"
import type { IBookInput, IBorrowInput } from "../types"

export const validateBookInput = (req: Request<{}, {}, IBookInput>, res: Response, next: NextFunction): void => {
  const { title, author, genre, isbn, copies } = req.body

  if (!title?.trim()) {
    throw new AppError("Title is required", 400)
  }
  if (!author?.trim()) {
    throw new AppError("Author is required", 400)
  }
  if (!genre?.trim()) {
    throw new AppError("Genre is required", 400)
  }
  if (!isbn?.trim()) {
    throw new AppError("ISBN is required", 400)
  }
  if (typeof copies !== "number" || copies < 0) {
    throw new AppError("Copies must be a non-negative number", 400)
  }

  next()
}

export const validateBorrowInput = (req: Request<{}, {}, IBorrowInput>, res: Response, next: NextFunction): void => {
  const { bookId, quantity, dueDate } = req.body

  if (!bookId?.trim()) {
    throw new AppError("Book ID is required", 400)
  }
  if (typeof quantity !== "number" || quantity < 1) {
    throw new AppError("Quantity must be at least 1", 400)
  }
  if (!dueDate) {
    throw new AppError("Due date is required", 400)
  }

  const dueDateObj = new Date(dueDate)
  if (isNaN(dueDateObj.getTime()) || dueDateObj <= new Date()) {
    throw new AppError("Due date must be a valid future date", 400)
  }

  next()
}

export const validateObjectId = (req: Request<{ id: string }>, res: Response, next: NextFunction): void => {
  const { id } = req.params

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    throw new AppError("Invalid ID format", 400)
  }

  next()
}
