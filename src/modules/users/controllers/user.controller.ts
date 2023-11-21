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
      const user = await this.userService.create(req.body);
      return res.status(StatusCodes.CREATED).json({
        data: user,
        status: StatusCodes.CREATED,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({
            errors: error.message,
            status: StatusCodes.BAD_REQUEST 
          });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: error.message,
        status: StatusCodes.INTERNAL_SERVER_ERROR
      });
    }
  }

  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const id = req.app.locals.userId;
      const updateData = req.body;
      const user = await this.userService.updateUser(id, updateData);
      return res.status(StatusCodes.OK).json({
        data: user,
        status: StatusCodes.OK,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ 
            errors: error.message,
            status: StatusCodes.BAD_REQUEST
          });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: error.message,
        status: StatusCodes.INTERNAL_SERVER_ERROR
      });
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const id = req.app.locals.userId;
      const user = await this.userService.delete(id);

      return res.status(StatusCodes.OK).json({
        data: user,
        status: StatusCodes.OK,
      });
    } catch (error: any) {
      if (error instanceof AppError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ 
            errors: error.message,
            status: StatusCodes.BAD_REQUEST
          });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: error.message,
        status: StatusCodes.INTERNAL_SERVER_ERROR
      });
    }
  }
}
