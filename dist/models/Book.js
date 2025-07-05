"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [200, "Title cannot exceed 200 characters"],
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true,
        maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
        trim: true,
        maxlength: [50, "Genre cannot exceed 50 characters"],
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required"],
        unique: true,
        trim: true,
        validate: {
            validator: (isbn) => {
                return /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/.test(isbn.replace(/[- ]/g, ""));
            },
            message: "Invalid ISBN format",
        },
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    imgUrl: {
        type: String,
        trim: true,
        required: true,
    },
    copies: {
        type: Number,
        required: [true, "Number of copies is required"],
        min: [0, "Copies cannot be negative"],
        validate: {
            validator: Number.isInteger,
            message: "Copies must be a whole number",
        },
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
const updateAvailability = function (next) {
    this.available = this.copies > 0;
    next();
};
bookSchema.pre("save", updateAvailability);
bookSchema.index({ isbn: 1 });
bookSchema.index({ title: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ available: 1 });
exports.default = (0, mongoose_1.model)("Book", bookSchema);
//# sourceMappingURL=Book.js.map