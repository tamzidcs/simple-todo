import { Request, Response, NextFunction } from "express";
import User from "../db/models/User";
import * as userService from "../service/user.service";
import { OK, UNAUTHORIZED, CONFLICT, CREATED, INTERNAL_SERVER_ERROR } from "http-status";

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const user = req.body;
  try {
    const result = await userService.registerUser(user);
    const resp = { message: result.message, username: result.username };
    res.status(result.statusCode).send(resp);
  } catch (error) {
    next(error);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const user: User = req.body;
  try {
    const loginResponse = await userService.loginUser(user);
    if (loginResponse) {
      res.status(loginResponse.statusCode).json({
        message: loginResponse?.message,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const user = req.params.username;
  try {
    const result = await userService.getAllUsers();
    res.send(result);
  } catch (error) {
    next(error);
  }
}
