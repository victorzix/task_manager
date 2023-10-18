import { NextFunction, Request, Response } from 'express';
import { UserServiceInterface } from '../services/user.service.interface';
import { UserControllerInterface } from './user.controller.interface';
import { StatusCodes } from 'http-status-codes';

export class UserController implements UserControllerInterface {
  constructor(private readonly userService: UserServiceInterface) {}

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try{
      const user = await this.userService.create(req.body)

      return res.send().json({
        data: user,
        message: StatusCodes.ACCEPTED
      })
    } catch(err: any) {
      next(err)
      return res.send().json(err.message)
    }

  }
}
