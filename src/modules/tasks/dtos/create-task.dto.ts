export interface CreateTaskDTO {
  title: string;
  description: string;
  user_id: string;
  time_to_complete: Date;
  completed_at: string | null;
}
