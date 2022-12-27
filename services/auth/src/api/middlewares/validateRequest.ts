import { Request, Response, NextFunction } from 'express';
import yup, { AnySchema } from 'yup';

export const validateRequest =
    (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        await schema.validate({
            params: req.params,
            body: req.body,
            query: req.query,
        });

        next();
    };
