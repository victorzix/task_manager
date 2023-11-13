import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from 'src/errors/unauthorized-error';
import { createAccessCookie, createRefreshCookie } from 'src/utils/sendCookies';
import TokenUtils from 'src/utils/token-utils';

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;
  
  if (!accessToken) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  try {
    const accessTokenPayload = TokenUtils.verifyToken(accessToken);
    const refreshTokenPayload = TokenUtils.verifyToken(refreshToken);

    if(!accessTokenPayload) {
      if(!refreshTokenPayload) {
        throw new UnauthorizedError('Unauthorized');
      }

      createAccessCookie(res, refreshTokenPayload.id);
    }
  return next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
}
