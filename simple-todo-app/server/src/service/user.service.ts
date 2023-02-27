import User, { GetAllUsersResponse, LoginRequest, LoginResponse } from "../db/models/User";
import { TaskInput, TaskOutput } from "../db/models/Task";
import { RegisterRequest, RegisterResponse } from "../db/models/User";

export async function registerUser(
  newUser: RegisterRequest
): Promise<RegisterResponse | undefined> {
  console.log("new user",newUser);
  const user: RegisterRequest = await User.create({
    id: newUser.id,
    username: newUser.username,
    password: newUser.password,
  });

  if (user) {
    return {
      id: user.id,
      username: user.username
    };
  } else {
    console.log('Registration failed.')
  }
}

export async function loginUser(
  user: LoginRequest
): Promise<LoginResponse | null> {
  console.log("user",user);
  const checkUser = await User.findOne({ where: { username: "usr1" } });
  if (!checkUser) {
    return { username: checkUser };
  } else {
    if (user.password === checkUser.password) {
      return { username: checkUser?.username };
    } else {
      return null;
    }
  }
  return null;
}