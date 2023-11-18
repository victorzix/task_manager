import { Request, Response, NextFunction } from 'express';

export interface UserControllerInterface {
  createUser: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response>;
  updateUser: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response>;
  deleteUser: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response>;
}
