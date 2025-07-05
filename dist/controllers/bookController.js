"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getAllBooks = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const errorHandler_1 = require("../middleware/errorHandler");
const getAllBooks = async (req, res, next) => {
    try {
        const page = Number.parseInt(req.query.page) || 1;
        const limit = Number.parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const books = await Book_1.default.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
        const total = await Book_1.default.countDocuments();
        res.status(200).json({
            success: true,
            data: books,
            message: `Retrieved ${books.length} books`,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllBooks = getAllBooks;
const getBookById = async (req, res, next) => {
    try {
        const book = await Book_1.default.findById(req.params.id).lean();
        if (!book) {
            throw new errorHandler_1.AppError("Book not found", 404);
        }
        res.status(200).json({
            success: true,
            data: book,
            message: "Book retrieved successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getBookById = getBookById;
const createBook = async (req, res, next) => {
    try {
        const book = new Book_1.default(req.body);
        await book.save();
        res.status(201).json({
            success: true,
            data: book.toObject(),
            message: "Book created successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createBook = createBook;
const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        let updateData = { ...req.body };
        if (updateData.copies !== undefined && updateData.copies === 0) {
            updateData.available = false;
        }
        else if (updateData.copies !== undefined && updateData.copies > 0 && updateData.available === false) {
            updateData.available = true;
        }
        const book = await Book_1.default.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
            lean: true,
        });
        if (!book) {
            throw new errorHandler_1.AppError("Book not found", 404);
        }
        res.status(200).json({
            success: true,
            data: book,
            message: "Book updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book_1.default.findByIdAndDelete(req.params.id);
        if (!book) {
            throw new errorHandler_1.AppError("Book not found", 404);
        }
        res.status(200).json({
            success: true,
            data: null,
            message: "Book deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteBook = deleteBook;
//# sourceMappingURL=bookController.js.map