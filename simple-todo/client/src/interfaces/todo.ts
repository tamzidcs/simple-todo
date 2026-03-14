export interface todo {
  id?: string;
  title: string;
  description: string;
  username: string;
}

export interface todoState {
  todos: todo[];
}
