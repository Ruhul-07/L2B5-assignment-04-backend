import type { Request, Response, NextFunction } from "express";
import type { IBorrow, IBorrowInput, IBorrowSummary, ApiResponse, BorrowResponse } from "../types";
export declare const borrowBook: (req: Request<{}, {}, IBorrowInput>, res: Response<ApiResponse<BorrowResponse>>, next: NextFunction) => Promise<void>;
export declare const getBorrowSummary: (req: Request, res: Response<ApiResponse<IBorrowSummary[]>>, next: NextFunction) => Promise<void>;
export declare const getAllBorrows: (req: Request, res: Response<ApiResponse<IBorrow[]>>, next: NextFunction) => Promise<void>;
//# sourceMappingURL=borrowController.d.ts.map