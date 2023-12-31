import { Request, Response } from 'express';

export interface AuthenticationControllerInterface {
  login: (req: Request, res: Response) => Promise<Response>;
  logout: (req: Request, res: Response) => Promise<Response>;
}
