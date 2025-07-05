import type { Request, Response, NextFunction } from "express";
import type { ErrorResponse } from "../types";
export declare class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string, statusCode: number);
}
export declare const errorHandler: (error: Error | AppError, req: Request, res: Response<ErrorResponse>, next: NextFunction) => void;
export declare const notFound: (req: Request, res: Response) => void;
//# sourceMappingURL=errorHandler.d.ts.map