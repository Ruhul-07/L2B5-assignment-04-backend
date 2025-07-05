"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBorrows = exports.getBorrowSummary = exports.borrowBook = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const Borrow_1 = __importDefault(require("../models/Borrow"));
const errorHandler_1 = require("../middleware/errorHandler");
const borrowBook = async (req, res, next) => {
    try {
        const { bookId, quantity, dueDate } = req.body;
        const book = await Book_1.default.findById(bookId);
        if (!book) {
            throw new errorHandler_1.AppError("Book not found", 404);
        }
        if (book.copies < quantity) {
            throw new errorHandler_1.AppError(`Only ${book.copies} copies available`, 400);
        }
        const borrow = new Borrow_1.default({
            bookId,
            bookTitle: book.title,
            isbn: book.isbn,
            quantity,
            dueDate: new Date(dueDate),
        });
        book.copies -= quantity;
        book.available = book.copies > 0;
        await Promise.all([borrow.save(), book.save()]);
        res.status(201).json({
            success: true,
            data: {
                message: "Book borrowed successfully",
                borrow: borrow.toObject(),
                updatedBook: book.toObject(),
            },
            message: "Book borrowed successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.borrowBook = borrowBook;
const getBorrowSummary = async (req, res, next) => {
    try {
        const summary = await Borrow_1.default.aggregate([
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
        ]);
        res.status(200).json({
            success: true,
            data: summary,
            message: `Retrieved borrow summary for ${summary.length} books`,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getBorrowSummary = getBorrowSummary;
const getAllBorrows = async (req, res, next) => {
    try {
        const page = Number.parseInt(req.query.page) || 1;
        const limit = Number.parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const borrows = await Borrow_1.default.find().populate("bookId").sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
        res.status(200).json({
            success: true,
            data: borrows,
            message: `Retrieved ${borrows.length} borrow records`,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBorrows = getAllBorrows;
//# sourceMappingURL=borrowController.js.map