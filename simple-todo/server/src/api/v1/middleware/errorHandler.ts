import { NextFunction, Request, Response } from "express";
import { BadRequestError, CustomError } from '../../v1/error.js';

export const errorHandler = (
  error: Error,
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    console.log(error);
    return resp.status(error.statusCode).json(error.serialize());
  }
};