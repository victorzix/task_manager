import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from 'src/errors/app-error';
import { TaskControllerInterface } from './task.controller.interface';
import { TaskServiceInterface } from '../services/task.service.interface';

export class TaskController implements TaskControllerInterface {
  constructor(private readonly taskService: TaskServiceInterface) {}

  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const data = req.body;
      const user_id = req.app.locals.userId;

      const task = await this.taskService.createTask({
        ...data,
        user_id,
      });

      return res.status(StatusCodes.CREATED).json({
        data: task,
        status: StatusCodes.CREATED,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: error.message });
      }
      return res.status(500).json('An error ocurred');
    }
  }
  async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const id = req.params.id;
      const updateData = req.body;

      const task = await this.taskService.updateTask(id, updateData);
      return res.status(StatusCodes.OK).json({
        data: task,
        status: StatusCodes.OK,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: error.message });
      }
      return res.status(500).json('An error ocurred');
    }
  }
  async list(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const user_id = req.app.locals.userId;
      const tasks = await this.taskService.listTasks(user_id);

      return res.status(StatusCodes.OK).json(tasks);
    } catch (error: any) {
      if (error instanceof AppError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: error.message });
      }
      return res.status(500).json('An error ocurred');
    }
  }
  async delete(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const id = req.params.id
      const task = await this.taskService.deleteTask(id);

      return res.status(StatusCodes.OK).json({
        data: task,
        status: StatusCodes.OK,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errors: error.message });
      }
      return res.status(500).json('An error ocurred');
    }
  }
}
