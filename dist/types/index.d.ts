import type { Document, Types } from "mongoose";
export interface IBook extends Document {
    _id: Types.ObjectId;
    title: string;
    author: string;
    genre: string;
    isbn: string;
    description?: string;
    imgUrl: string;
    copies: number;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface IBookInput {
    title: string;
    author: string;
    genre: string;
    isbn: string;
    description?: string;
    copies: number;
}
export interface IBookUpdate extends Partial<IBookInput> {
    available?: boolean;
}
export interface IBorrow extends Document {
    _id: Types.ObjectId;
    bookId: Types.ObjectId;
    bookTitle: string;
    isbn: string;
    quantity: number;
    dueDate: Date;
    borrowDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface IBorrowInput {
    bookId: string;
    quantity: number;
    dueDate: string;
}
export interface IBorrowSummary {
    _id: Types.ObjectId;
    bookTitle: string;
    isbn: string;
    totalQuantityBorrowed: number;
    borrowCount: number;
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
export interface ErrorResponse {
    message: string;
    error?: string | undefined;
    statusCode?: number;
}
export interface BorrowResponse {
    message: string;
    borrow: IBorrow;
    updatedBook: IBook;
}
//# sourceMappingURL=index.d.ts.map