export interface todo {
  id?: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export interface todoRequest {
  title: string;
  description: string;
  username: string;
  dueDate: string;
}

export interface todoState {
    todos: todo[];
}
