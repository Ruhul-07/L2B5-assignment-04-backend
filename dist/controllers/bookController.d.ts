import type { Request, Response, NextFunction } from "express";
import type { IBook, IBookInput, IBookUpdate, ApiResponse } from "../types";
export declare const getAllBooks: (req: Request, res: Response<ApiResponse<IBook[]>>, next: NextFunction) => Promise<void>;
export declare const getBookById: (req: Request<{
    id: string;
}>, res: Response<ApiResponse<IBook>>, next: NextFunction) => Promise<void>;
export declare const createBook: (req: Request<{}, {}, IBookInput>, res: Response<ApiResponse<IBook>>, next: NextFunction) => Promise<void>;
export declare const updateBook: (req: Request<{
    id: string;
}, {}, IBookUpdate>, res: Response<ApiResponse<IBook>>, next: NextFunction) => Promise<void>;
export declare const deleteBook: (req: Request<{
    id: string;
}>, res: Response<ApiResponse<null>>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=bookController.d.ts.map