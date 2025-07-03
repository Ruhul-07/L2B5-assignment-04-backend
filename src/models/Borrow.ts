import { Schema, model } from "mongoose"
import type { IBorrow } from "../types"

const borrowSchema = new Schema<IBorrow>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book ID is required"],
    },
    bookTitle: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole number",
      },
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      validate: {
        validator: (dueDate: Date): boolean => dueDate > new Date(),
        message: "Due date must be in the future",
      },
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes for better query performance
borrowSchema.index({ bookId: 1 })
borrowSchema.index({ dueDate: 1 })
borrowSchema.index({ borrowDate: 1 })

export default model<IBorrow>("Borrow", borrowSchema)
