import { CreateTaskDTO, Task, UpdateTaskDTO } from '../dtos';
import { TaskRepositoryInterface } from './task.repository.interface';
import { prisma } from 'src/infra/db';

export class TaskRepository implements TaskRepositoryInterface {
  async create(dto: CreateTaskDTO): Promise<Task> {
    const task = await prisma.tasks.create({
      data: dto,
    });

    return task;
  }

  async listTasks(user_id: string): Promise<Task[]> {
    const tasks = await prisma.tasks.findMany({ where: { user_id } });
    return tasks;
  }

  async findById(id: string): Promise<Task | null> {
    const task = await prisma.tasks.findFirst({ where: { id } });
    return task;
  }

  async update(id: string, dto: UpdateTaskDTO): Promise<Task | null> {
    const updateTask = await prisma.tasks.update({
      where: {
        id,
      },
      data: dto,
    });

    return updateTask;
  }

  async delete(id: string): Promise<Task | null> {
    const deletedTask = await prisma.tasks.delete({
      where: {
        id,
      },
    });

    return deletedTask;
  }
}
