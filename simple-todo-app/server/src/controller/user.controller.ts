import { Request, Response, NextFunction } from "express";
import User from "../db/models/User";
import * as userService from "../service/user.service";
import { OK, UNAUTHORIZED } from 'http-status';

export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const user = req.body;
  try {
    const result = await userService.registerUser(user);
    res.send(result);
  } catch (error) {
    console.log(error);
  }
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const user: User = req.body;
  try {
    const loggedInUser = await userService.loginUser(user);
    if (loggedInUser) {
      res.status(OK).json({
        username: loggedInUser.username,
      });
    } else {
      res.status(UNAUTHORIZED).json({
        username: user.username,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
