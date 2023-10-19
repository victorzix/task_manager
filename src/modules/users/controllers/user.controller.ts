import { NextFunction, Request, Response } from 'express';
import { UserServiceInterface } from '../services/user.service.interface';
import { UserControllerInterface } from './user.controller.interface';
import { StatusCodes } from 'http-status-codes';
import { AppError } from 'src/errors/app-error';

export class UserController implements UserControllerInterface {
  constructor(private readonly userService: UserServiceInterface) {}

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      console.log(req.body)
      const user = await this.userService.create(req.body);
      return res.status(StatusCodes.CREATED).json({
        data: user,
        status: StatusCodes.CREATED,
      });
    } catch (error: any) {
      next(error);
      if (error instanceof AppError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: error.message });
      }
      return res.status(500).json('An error ocurred');
    }
  }

  async changeName(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { id, newName } = req.body;
      const user = await this.userService.changeName(id, newName);
      return res.status(StatusCodes.OK).json({
        data: user,
        status: StatusCodes.OK,
      });
    } catch (error) {
      next(error);
      if (error instanceof AppError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: error.message });
      }
      return res.status(500).json('An error ocurred');
    }
  }

  async changePassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { id, newPassword } = req.body;
      const user = await this.userService.changePassword(id, newPassword);
      return res.status(StatusCodes.OK).json({
        data: user,
        status: StatusCodes.OK,
      });
    } catch (error) {
      next(error);
      if (error instanceof AppError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: error.message });
      }
      return res.status(500).json('An error ocurred');
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { id } = req.body;
      const user = await this.userService.delete(id);

      return res.status(StatusCodes.OK).json({
        data: user,
        status: StatusCodes.OK,
      });
    } catch (error) {
      next(error);
      if (error instanceof AppError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: error.message });
      }
      return res.status(500).json('An error ocurred');
    }
  }
}
