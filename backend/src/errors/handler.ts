import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface IValidationError {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = function (error, req, res, next) {

    if (error instanceof ValidationError) {
        let errors: IValidationError = {};

        error.inner.forEach(function (err) {
            errors[err.path] = err.errors;
        });

        return res.status(400).json({ message: 'Validations fails', errors });
    }

    console.error(error);

    return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;