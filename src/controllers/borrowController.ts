import type { Request, Response, NextFunction } from "express"
import Book from "../models/Book"
import Borrow from "../models/Borrow"
import { AppError } from "../middleware/errorHandler"
import type { IBorrow, IBorrowInput, IBorrowSummary, ApiResponse, BorrowResponse } from "../types"


export const borrowBook = async (
  req: Request<{}, {}, IBorrowInput>,
  res: Response<ApiResponse<BorrowResponse>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { bookId, quantity, dueDate } = req.body

    const book = await Book.findById(bookId)
    if (!book) {
      throw new AppError("Book not found", 404)
    }

    if (book.copies < quantity) {
      throw new AppError(`Only ${book.copies} copies available`, 400)
    }

    // Create borrow record
    const borrow = new Borrow({
      bookId,
      bookTitle: book.title,
      isbn: book.isbn,
      quantity,
      dueDate: new Date(dueDate),
    })

    // Update book copies
    book.copies -= quantity
    book.available = book.copies > 0

    // Save both documents
    await Promise.all([borrow.save(), book.save()])

    res.status(201).json({
      success: true,
      data: {
        message: "Book borrowed successfully",
        borrow: borrow.toObject(),
        updatedBook: book.toObject(),
      },
      message: "Book borrowed successfully",
    })
  } catch (error) {
    // console.error('Full error object during borrow creation:', error);
    next(error)
  }
}

export const getBorrowSummary = async (
  req: Request,
  res: Response<ApiResponse<IBorrowSummary[]>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const summary = await Borrow.aggregate<IBorrowSummary>([
      {
        $group: {
          _id: "$bookId",
          bookTitle: { $first: "$bookTitle" },
          isbn: { $first: "$isbn" },
          totalQuantityBorrowed: { $sum: "$quantity" },
          borrowCount: { $sum: 1 },
        },
      },
      {
        $sort: { totalQuantityBorrowed: -1 },
      },
    ])

    res.status(200).json({
      success: true,
      data: summary,
      message: `Retrieved borrow summary for ${summary.length} books`,
    })
  } catch (error) {
    next(error)
  }
}

export const getAllBorrows = async (
  req: Request,
  res: Response<ApiResponse<IBorrow[]>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const borrows = await Borrow.find().populate("bookId").sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

    res.status(200).json({
      success: true,
      data: borrows,
      message: `Retrieved ${borrows.length} borrow records`,
    })
  } catch (error) {
    next(error)
  }
}
