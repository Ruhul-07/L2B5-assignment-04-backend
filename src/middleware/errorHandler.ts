import type { Request, Response, NextFunction } from "express"
import type { ErrorResponse } from "../types"

export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction,
): void => {
  let statusCode = 500
  let message = "Internal Server Error"

  if (error instanceof AppError) {
    statusCode = error.statusCode
    message = error.message
  } else if (error.name === "ValidationError") {
    statusCode = 400
    message = "Validation Error"
  } else if (error.name === "CastError") {
    statusCode = 400
    message = "Invalid ID format"
  } else if ((error as any).code === 11000) {
    statusCode = 400
    message = "Duplicate field value"
  }

  console.error(`Error ${statusCode}: ${message}`, error)

  res.status(statusCode).json({
    message,
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
    statusCode,
  })
}

export const notFound = (req: Request, res: Response): void => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
    statusCode: 404,
  })
}
