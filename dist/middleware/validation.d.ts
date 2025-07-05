import type { Request, Response, NextFunction } from "express";
import type { IBookInput, IBorrowInput } from "../types";
export declare const validateBookInput: (req: Request<{}, {}, IBookInput>, res: Response, next: NextFunction) => void;
export declare const validateBorrowInput: (req: Request<{}, {}, IBorrowInput>, res: Response, next: NextFunction) => void;
export declare const validateObjectId: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validation.d.ts.map