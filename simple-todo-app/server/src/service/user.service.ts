import { error } from "console";
import User from "../db/models/User";
import * as UserRepo from "../repository/userRepo";
import * as bcrypt from "bcrypt";

interface LoginResponse {
  username: string;
}

interface RegisterResponse {
  username: string;
}

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
    throw new Error("User already exists.");
  } else {
    try {
      await UserRepo.createUser(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

async function validatePassord(userPassword: string, loginPassword: string): Promise<Boolean> {
  const valid = await bcrypt.compare(loginPassword,userPassword);
  return valid;
}

export async function registerUser(newUser: User): Promise<RegisterResponse>{
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
    throw new Error("user not found");
  } else if (checkUser !== null) {
    const valid = await validatePassord(checkUser.password, user.password);
    if(valid) {
      return { username: checkUser?.username };
    }
    throw new Error("login failed");
  }
  throw new Error("login failed");
}

export async function getAllUsers(): Promise<GetAllUserResponse[]> {
  const users:GetAllUserResponse[]  = await UserRepo.getAllUser();
  return users;
}
