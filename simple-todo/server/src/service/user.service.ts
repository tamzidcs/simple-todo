import { error } from "console";
import { User } from "../db/entities/User.js";
import * as UserRepo from "../repository/userRepo.js";
import * as bcrypt from "bcrypt";
import { AuthenticationError, DatabaseError } from "../error.js";
import status from "http-status";
import { AppDataSource } from "../db/data-source.js";

interface LoginResponse {
  username: string;
}

interface RegisterResponse {
  username: string;
}

interface GetAllUserResponse {
  id?: string;
  username: string;
}

async function createNewUser(username: string, password: string) {
  const user = new User();
  user.username = username;
  user.password = password;

  const existingUser = await UserRepo.getUserByUsername(user.username);
  if (existingUser) {
    throw new DatabaseError("User already exists.", status.CONFLICT);
  } else {
    try {
      await UserRepo.createUser(user);
      return user;
    } catch (error) {
      if (error instanceof Error && error.message === "User already exists.") {
        throw new DatabaseError(error.message, status.CONFLICT);
      }
    }
  }
}

async function validatePassord(
  userPassword: string,
  loginPassword: string,
): Promise<Boolean> {
  const valid = await bcrypt.compare(loginPassword, userPassword);
  return valid;
}

export async function registerUser(newUser: User): Promise<RegisterResponse> {
  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(newUser.password, saltOrRounds);
  try {
    const result = await createNewUser(newUser.username, hashedPassword);
    if (result) {
      return { username: newUser.username };
    }
  } catch (error) {
    throw error;
  }
  return { username: newUser.username };
}

export async function loginUser(user: User): Promise<LoginResponse | null> {
  const checkUser = await UserRepo.getUserByUsername(user.username);
  if (!checkUser) {
    throw new AuthenticationError("user not found", status.UNAUTHORIZED);
  } else if (checkUser !== null) {
    const valid = await validatePassord(checkUser.password, user.password);
    if (valid) {
      return { username: checkUser?.username };
    }
    throw new AuthenticationError("login failed", status.UNAUTHORIZED);
  }
  throw new AuthenticationError("login failed", status.UNAUTHORIZED);
}

export async function getAllUsers(): Promise<User[]> {
  const users  = await AppDataSource
  .getRepository(User)
  .createQueryBuilder("user")
  .getMany()

  return users;
}
