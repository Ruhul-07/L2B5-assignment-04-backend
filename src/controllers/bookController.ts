import type { Request, Response, NextFunction } from "express"
import Book from "../models/Book"
import { AppError } from "../middleware/errorHandler"
import type { IBook, IBookInput, IBookUpdate, ApiResponse } from "../types"

export const getAllBooks = async (
  req: Request,
  res: Response<ApiResponse<IBook[]>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const page = Number.parseInt(req.query.page as string) || 1
    const limit = Number.parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const books = await Book.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

    const total = await Book.countDocuments()

    res.status(200).json({
      success: true,
      data: books,
      message: `Retrieved ${books.length} books`,
    })
  } catch (error) {
    next(error)
  }
}

export const getBookById = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<IBook>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await Book.findById(req.params.id).lean()

    if (!book) {
      throw new AppError("Book not found", 404)
    }

    res.status(200).json({
      success: true,
      data: book,
      message: "Book retrieved successfully",
    })
  } catch (error) {
    next(error)
  }
}

export const createBook = async (
  req: Request<{}, {}, IBookInput>,
  res: Response<ApiResponse<IBook>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = new Book(req.body)
    await book.save()
    //  console.log(book)
    res.status(201).json({
      success: true,
      data: book.toObject(),
      message: "Book created successfully",
    })
  } catch (error) {
    next(error)
  }
}

// export const updateBook = async (
//   req: Request<{ id: string }, {}, IBookUpdate>,
//   res: Response<ApiResponse<IBook>>,
//   next: NextFunction,
// ): Promise<void> => {
//   try {
//     const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//       lean: true,
//     })

//     if (!book) {
//       throw new AppError("Book not found", 404)
//     }

//     res.status(200).json({
//       success: true,
//       data: book,
//       message: "Book updated successfully",
//     })
//   } catch (error) {
//     next(error)
//   }
// }


export const updateBook = async (
  req: Request<{ id: string }, {}, IBookUpdate>,
  res: Response<ApiResponse<IBook>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    let updateData: IBookUpdate = { ...req.body }; // Create a mutable copy of the body

    // Business logic: If copies are set to 0, mark the book as unavailable
    // Ensure 'copies' is treated as a number for comparison
    if (updateData.copies !== undefined && updateData.copies === 0) {
      updateData.available = false;
    } else if (updateData.copies !== undefined && updateData.copies > 0 && updateData.available === false) {
      // If copies become positive but 'available' was explicitly set to false,
      // you might want to keep it false or set it to true.
      // For this implementation, if copies are positive, we assume it should be available
      // unless explicitly set to false by the user. If it was false and copies become >0,
      // we make it available.
      updateData.available = true;
    }


    const book = await Book.findByIdAndUpdate(id, updateData, { // Use updateData here
      new: true,
      runValidators: true,
      lean: true,
    });

    if (!book) {
      throw new AppError("Book not found", 404);
    }

    res.status(200).json({
      success: true,
      data: book,
      message: "Book updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: Request<{ id: string }>,
  res: Response<ApiResponse<null>>,
  next: NextFunction,
): Promise<void> => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)

    if (!book) {
      throw new AppError("Book not found", 404)
    }

    res.status(200).json({
      success: true,
      data: null,
      message: "Book deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}
