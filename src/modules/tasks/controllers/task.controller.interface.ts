import { Request, Response, NextFunction } from 'express';

export interface TaskControllerInterface {
  create: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response>;
  update: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response>;
  list: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response>;
  delete: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response>;
}
