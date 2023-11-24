import { error } from "console";
import User from "../db/models/User";
import * as bcrypt from "bcrypt";
import { UNAUTHORIZED, OK } from "http-status";

interface LoginResponse {
  statusCode: number;
  message: string;
}

interface RegisterResponse {
  username: string;
}

const incorrectUserNamePasswordMessage = "Incorrect username or password.";
const loginSuccessfullMessage = "Login successfull.";

async function createNewUser(username: string, password: string) {
  const user = new User({
    username: username,
    password: password,
  });

  const existingUser = await User.findOne({ where: { username: username } });
  if (existingUser) {
    throw new Error("User already exists.");
  } else {
    try {
      await user.save();
      return user;
    } catch (error) {
      console.log(error);
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
  const checkUser = await User.findOne({ where: { username: user.username } });
  if (!checkUser) {
    return {
      statusCode: UNAUTHORIZED,
      message: incorrectUserNamePasswordMessage,
    };
  } else if (checkUser !== null) {
    const valid = await validatePassord(checkUser.password, user.password);
    if (valid) {
      return { statusCode: OK, message: loginSuccessfullMessage };
    }
  }
  return {
    statusCode: UNAUTHORIZED,
    message: incorrectUserNamePasswordMessage,
  };
}

export async function getAllUsers(): Promise<User[]> {
  const users = await User.findAll();
  return users;
}
