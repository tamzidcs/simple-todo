import { error } from "console";
import User from "../db/models/User";
import * as bcrypt from "bcrypt";

interface LoginResponse {
  username: string;
}

interface RegisterResponse {
  username: string;
}

async function createNewUser(username: string, password: string) {
  const user = new User({
    username: username,
    password: password,
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }
}

async function validatePassord(userPassword: string, loginPassword: string): Promise<Boolean> {
  const valid = await bcrypt.compare(loginPassword,userPassword);
  return valid;
}

export async function registerUser(newUser: User): Promise<RegisterResponse> {
  const saltOrRounds = 10;
  await bcrypt.hash(newUser.password, saltOrRounds, async(err, hash) => {
    await createNewUser(newUser.username, hash);
  });
  return { username: newUser.username };
}

export async function loginUser(user: User): Promise<LoginResponse | null> {
  const checkUser = await User.findOne({ where: { username: user.username } });
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

export async function getAllUsers(): Promise<User[]> {
  const users = await User.findAll();
  return users;
}
