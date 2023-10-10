export interface Task {
  id: string;
  description: string;
  time: number;
  completed: boolean;
  created_at: Date;
  completed_at: string;
}
