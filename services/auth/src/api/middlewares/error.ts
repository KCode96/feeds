import { ErrorResponse } from './../../utils/errorResponse';
import { Request, Response, NextFunction } from 'express';

export default function (
    err: ErrorResponse,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error!';

    res.status(statusCode).json({ success: false, message, data: null });
}
