import { type CreateTaskDTO, type Task, type UpdateTaskDTO} from '../dtos';

export interface TaskServiceInterface {
  createTask: (dto: CreateTaskDTO) => Promise<Task>;
  listTasks: (userId: string) => Promise<Task[]>
  updateTask: (id: string, dto: UpdateTaskDTO) => Promise<Task>
  deleteTask: (id: string) => Promise<Task>;
}
