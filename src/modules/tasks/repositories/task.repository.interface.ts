import { CreateTaskDTO, Task, UpdateTaskDTO } from '../dtos/index';

export interface TaskRepositoryInterface {
  create: (dto: CreateTaskDTO) => Promise<Task>;
  listTasks: (user_id: string) => Promise<Task[]>
  findById: (id: string) => Promise<Task | null>;
  update: (id: string, dto: UpdateTaskDTO) => Promise<Task | null>
  delete: (id: string) => Promise<Task | null>;
}
