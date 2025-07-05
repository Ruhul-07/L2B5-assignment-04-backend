"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandler = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    if (error instanceof AppError) {
        statusCode = error.statusCode;
        message = error.message;
    }
    else if (error.name === "ValidationError") {
        statusCode = 400;
        message = "Validation Error";
    }
    else if (error.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
    }
    else if (error.code === 11000) {
        statusCode = 400;
        message = "Duplicate field value";
    }
    console.error(`Error ${statusCode}: ${message}`, error);
    res.status(statusCode).json({
        message,
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
        statusCode,
    });
};
exports.errorHandler = errorHandler;
const notFound = (req, res) => {
    res.status(404).json({
        message: `Route ${req.originalUrl} not found`,
        statusCode: 404,
    });
};
exports.notFound = notFound;
//# sourceMappingURL=errorHandler.js.map