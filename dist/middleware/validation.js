"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObjectId = exports.validateBorrowInput = exports.validateBookInput = void 0;
const errorHandler_1 = require("./errorHandler");
const validateBookInput = (req, res, next) => {
    const { title, author, genre, isbn, copies } = req.body;
    if (!title?.trim()) {
        throw new errorHandler_1.AppError("Title is required", 400);
    }
    if (!author?.trim()) {
        throw new errorHandler_1.AppError("Author is required", 400);
    }
    if (!genre?.trim()) {
        throw new errorHandler_1.AppError("Genre is required", 400);
    }
    if (!isbn?.trim()) {
        throw new errorHandler_1.AppError("ISBN is required", 400);
    }
    if (typeof copies !== "number" || copies < 0) {
        throw new errorHandler_1.AppError("Copies must be a non-negative number", 400);
    }
    next();
};
exports.validateBookInput = validateBookInput;
const validateBorrowInput = (req, res, next) => {
    const { bookId, quantity, dueDate } = req.body;
    if (!bookId?.trim()) {
        throw new errorHandler_1.AppError("Book ID is required", 400);
    }
    if (typeof quantity !== "number" || quantity < 1) {
        throw new errorHandler_1.AppError("Quantity must be at least 1", 400);
    }
    if (!dueDate) {
        throw new errorHandler_1.AppError("Due date is required", 400);
    }
    const dueDateObj = new Date(dueDate);
    if (isNaN(dueDateObj.getTime()) || dueDateObj <= new Date()) {
        throw new errorHandler_1.AppError("Due date must be a valid future date", 400);
    }
    next();
};
exports.validateBorrowInput = validateBorrowInput;
const validateObjectId = (req, res, next) => {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new errorHandler_1.AppError("Invalid ID format", 400);
    }
    next();
};
exports.validateObjectId = validateObjectId;
//# sourceMappingURL=validation.js.map