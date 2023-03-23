import User from "../db/models/User";

export async function registerUser(newUser: User): Promise<User> {
  const user = new User({
    username: newUser.username,
    password: newUser.password
  });
  const savedUser = await user.save();
  if(!savedUser) {
    throw new Error('Invalid user');
  }
  return user;
}
interface LoginResponse {
  username: string;
}

export async function loginUser(user: User): Promise<LoginResponse | null> {
  const checkUser = await User.findOne({ where: { username: user.username } });
  if (!checkUser) {
    throw new Error('user not found');
  } else if(checkUser !== null){
    if (user.password === checkUser.password) {
      return { username: checkUser?.username };
    }
    return { username: user.username };
  }
  throw new Error('login failed');
}

export async function getAllUsers(): Promise<User[]> {
  const users = await User.findAll();
  return users;
}
