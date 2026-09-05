export interface todo {
  id?: string;
  title: string;
  description: string;
  status: string;
  username: string;
}

export interface todoState {
  todos: todo[];
}
