import { Request, Response } from 'express';
import { AuthenticationControllerInterface } from './authentication.controller.interface';
import { StatusCodes } from 'http-status-codes';
import { createAccessCookie, createRefreshCookie } from 'src/utils/sendCookies';
import { AuthenticationServiceInterface } from '../services/authentication.service.interface';
import { AppError } from 'src/errors/app-error';

export class AuthenticationController
  implements AuthenticationControllerInterface
{
  constructor(private readonly authenticationService: AuthenticationServiceInterface) {}

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.authenticationService.login(req.body)
  
      await createAccessCookie(res, user.token);
      await createRefreshCookie(res, user.refreshToken);
    
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
      });
    } catch(error: any) {
      console.log(error)
      if (error instanceof AppError) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ 
            status: StatusCodes.BAD_REQUEST,
            errors: error.message 
          });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('An error ocurred');
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.status(StatusCodes.OK).json({
      message: 'Successfully logout',
      status: StatusCodes.OK
    })
  }
}
