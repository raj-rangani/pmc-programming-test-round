import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";
import { ApiError } from "../utils/ApiError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

function errorHandler(
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(err);
  if (err instanceof ValidationError) {
    err = new ApiError(400, err.message, err.errors, err.stack);
  } else if (err instanceof PrismaClientKnownRequestError) {
    const message = `${err.meta.modelName}: ${err.meta.cause}`;
    err = new ApiError(400, message, [message], err.stack);
  }

  const response = {
    ...err,
    message: err.message,
    ...(process.env.NODE_ENV === "development" ? { stack: err.stack } : {}),
  };

  return res.status((err as ApiError).statusCode).json(response);
}

export { errorHandler };
