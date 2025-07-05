"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    bookId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
            validator: (dueDate) => dueDate > new Date(),
            message: "Due date must be in the future",
        },
    },
    borrowDate: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
borrowSchema.index({ bookId: 1 });
borrowSchema.index({ dueDate: 1 });
borrowSchema.index({ borrowDate: 1 });
exports.default = (0, mongoose_1.model)("Borrow", borrowSchema);
//# sourceMappingURL=Borrow.js.map