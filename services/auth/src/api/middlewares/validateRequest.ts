import { Request, Response, NextFunction } from 'express';
import yup, { AnySchema } from 'yup';

const validateRequest =
    (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body);

        await schema.validate({
            params: req.params,
            body: req.body,
            query: req.query,
        });

        next();
    };

export default validateRequest;
