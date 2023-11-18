import isObjEmpty from 'src/utils/isObjEmpty';
import { type Task, type CreateTaskDTO, type UpdateTaskDTO } from '../dtos';
import { TaskRepositoryInterface } from '../repositories/task.repository.interface';
import { TaskServiceInterface } from './task.service.interface';
import { BadRequestError } from 'src/errors/bad-request-error';
import { TaskSchema, UpdateTaskSchema } from '../schemas/task.schema';
import { ForbiddenError } from 'src/errors/forbidden-error';
import { NotFoundError } from 'src/errors/not-found-error';

export class TaskService implements TaskServiceInterface {
  constructor(private readonly taskRepository: TaskRepositoryInterface) {}

  async createTask(dto: CreateTaskDTO): Promise<Task> {
    const isEmpty = await isObjEmpty(dto);
    const validationErrors: String[] = [];

    if (isEmpty) {
      throw new BadRequestError(
        'At least one field is required to create a task',
      );
    }

    const validationResult = TaskSchema.safeParse(dto);

    if (!validationResult.success) {
      for (const error of validationResult.error.issues) {
        validationErrors.push(error.message);
      }
      throw new ForbiddenError(`${validationErrors.join(', ')}`);
    }

    const task = await this.taskRepository.create(dto);

    return task;
  }

  async listTasks(userId: string): Promise<Task[]> {
    const taskList = await this.taskRepository.listTasks(userId);
    return taskList;
  }

  async updateTask(id: string, dto: UpdateTaskDTO): Promise<Task> {
    const isEmpty = isObjEmpty(dto);
    const validationErrors: String[] = [];

    if (isEmpty) {
      throw new BadRequestError(
        'At least one field is required to update a task',
      );
    }

    const validationResult = UpdateTaskSchema.safeParse(dto);

    if (!validationResult.success) {
      for (const error of validationResult.error.issues) {
        validationErrors.push(error.message);
      }
      throw new ForbiddenError(`${validationErrors.join(', ')}`);
    }

    const task = await this.taskRepository.update(id, dto);
    if (!task) {
      throw new NotFoundError('Task not found');
    }
    return task;
  }
  async deleteTask(id: string): Promise<Task> {
    const task = await this.taskRepository.delete(id);

    if (!task) {
      throw new NotFoundError('Task not found');
    }

    return task;
  }
}
