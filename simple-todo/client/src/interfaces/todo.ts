export interface todo {
  id?: string;
  title: string;
  description: string;
  status: string;
}

export interface todoRequest {
  title: string;
  description: string;
  username: string;
}
