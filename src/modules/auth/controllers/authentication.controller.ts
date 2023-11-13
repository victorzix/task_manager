import { Request, Response } from 'express';
import { AuthenticationControllerInterface } from './authentication.controller.interface';
import { UserRepositoryInterface } from 'src/modules/users/repositories/user.repository.interface';
import bcrypt from 'bcrypt';
import { BadRequestError } from 'src/errors/bad-request-error';
import TokenUtils from 'src/utils/token-utils';
import { StatusCodes } from 'http-status-codes';
import { createAccessCookie, createRefreshCookie } from 'src/utils/sendCookies';

export class AuthenticationController
  implements AuthenticationControllerInterface
{
  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError('Invalid e-mail or password');
    }

    const validPass = await bcrypt.compare(password, user.password_hash);

    if (!validPass) {
      throw new BadRequestError('Invalid e-mail or password');
    }

    const token = TokenUtils.generateAccessToken(user.id);
    const refreshToken = TokenUtils.generateRefreshToken(user.id);

    await createAccessCookie(res, token);
    await createRefreshCookie(res, refreshToken);
  
    return res.status(200).json({
      status: StatusCodes.OK,
    });
  }

  async logout(req: Request, res: Response): Promise<Response> {
    return res.json();
  }
}
