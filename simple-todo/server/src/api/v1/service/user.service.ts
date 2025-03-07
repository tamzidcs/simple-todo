import { error } from "console";
import User from "../db/models/User";
import * as UserRepo from "../repository/userRepo";
import * as bcrypt from "bcrypt";
import { UNAUTHORIZED, OK, CREATED, CONFLICT, INTERNAL_SERVER_ERROR, FORBIDDEN } from "http-status";
import { AuthenticationError, DatabaseError } from "../error";

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
  const user = new User({
    username: username,
    password: password,
  });

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
      statusCode: CREATED,
      message: userCreatedMessage,
      username: newUser.username,
    };
  } else if (result.message === userAlreadyExistMessage) {
    throw new DatabaseError(userAlreadyExistMessage, CONFLICT);
  } else {
    return {
      statusCode: INTERNAL_SERVER_ERROR,
      message: registrationFailed,
      username: newUser.username,
    };
  }
}

export async function loginUser(user: User): Promise<LoginResponse | null> {
  const checkUser = await UserRepo.getUserByUsername(user.username);
  if (!checkUser) {
    throw new AuthenticationError(incorrectUserNamePasswordMessage,UNAUTHORIZED);
  } else if (checkUser !== null) {
    const valid = await validatePassord(checkUser.password, user.password);
    if (valid) {
      return { statusCode: OK, message: loginSuccessfullMessage };
    }
  }
  throw new AuthenticationError(incorrectUserNamePasswordMessage,UNAUTHORIZED);
}

export async function getAllUsers(): Promise<GetAllUserResponse[]> {
  const users:GetAllUserResponse[]  = await User.findAll({attributes:['id','username']});
  return users;
}
