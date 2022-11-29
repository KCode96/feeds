import { Request, Response, NextFunction } from 'express';

export default function (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const statusCode = req.statusCode || 500;
    const message = err.message || 'Internal Server Error!';

    res.status(statusCode).json({ success: false, message, data: null });
}
