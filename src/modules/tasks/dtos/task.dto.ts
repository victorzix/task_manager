export interface Task {
  id: string;
  description: string;
  user_id: string;
  time_to_complete: Date;
  completed: boolean;
  created_at: Date;
  completed_at: string;
}
