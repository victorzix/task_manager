export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  tasks: Task[];
  created_at: Date;
}
