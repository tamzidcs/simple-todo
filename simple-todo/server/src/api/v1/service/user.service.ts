import { error } from "console";
import { User } from '../db/entity/User.js';
import * as UserRepo from '../repository/userRepo.js';
import * as bcrypt from "bcrypt";
import status from "http-status";
import { AuthenticationError, DatabaseError } from '../error.js';
import AppDataSource from '../db/db.js';

interface LoginResponse {
  statusCode: number;
  message: string;
}

interface RegisterResponse {
  statusCode: number;
  message: string;
  username: string;
}

const incorrectUserNamePasswordMessage = "Incorrect username or password.";
const loginSuccessfullMessage = "Login successfull.";
const userAlreadyExistMessage = "User already exists";
const userCreatedMessage = "User created.";
const registrationFailed = "User registration failed.";
interface GetAllUserResponse {
  id?: string,
  username: string
}

async function createNewUser(username: string, password: string) {
  const user = new User();
  user.username = username;
  user.password = password;
  user.todos = [];

  const existingUser = await UserRepo.getUserByUsername(user.username);
  if (existingUser) {
    return { userCreated: false, message: userAlreadyExistMessage };
  } else {
    try {
      await UserRepo.createUser(user);
      return { userCreated: true, message: userCreatedMessage };
    } catch (error) {
      return { userCreated: false, message: error };
    }
  }
}

async function validatePassord(
  userPassword: string,
  loginPassword: string
): Promise<Boolean> {
  const valid = await bcrypt.compare(loginPassword, userPassword);
  return valid;
}

export async function registerUser(newUser: User): Promise<RegisterResponse> {
  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(newUser.password, saltOrRounds);

  const result = await createNewUser(newUser.username, hashedPassword);
  if (result.userCreated) {
    return {
      statusCode: status.CREATED,
      message: userCreatedMessage,
      username: newUser.username,
    };
  } else if (result.message === userAlreadyExistMessage) {
    throw new DatabaseError(userAlreadyExistMessage, status.CONFLICT);
  } else {
    return {
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: registrationFailed,
      username: newUser.username,
    };
  }
}

export async function loginUser(user: User): Promise<LoginResponse | null> {
  const checkUser = await UserRepo.getUserByUsername(user.username);
  if (!checkUser) {
    throw new AuthenticationError(incorrectUserNamePasswordMessage,status.UNAUTHORIZED);
  } else if (checkUser !== null) {
    const valid = await validatePassord(checkUser.password, user.password);
    if (valid) {
      return { statusCode: status.OK, message: loginSuccessfullMessage };
    }
  }
  throw new AuthenticationError(incorrectUserNamePasswordMessage,status.UNAUTHORIZED);
}

export async function getAllUsers(): Promise<User[]> {
  const users  = await AppDataSource
  .getRepository(User)
  .createQueryBuilder("user")
  .getMany()

  return users;
}

export async function createUserTodoRelationship(userId: string, todoId: string) {
  await AppDataSource.createQueryBuilder()
    .relation(User, "todos")
    .of(userId)
    .add(todoId);
}
