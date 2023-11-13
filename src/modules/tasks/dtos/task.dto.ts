export interface Task {
  id: string;
  description: string;
  userId: string;
  time: number;
  completed: boolean;
  created_at: Date;
  completed_at: string;
}
