export interface CreateTaskDTO {
  description: string;
  userId: string;
  time: number;
  completed: boolean;
  completed_at: string;
}
