import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from 'src/errors/unauthorized-error';
import { createAccessCookie, createRefreshCookie } from 'src/utils/sendCookies';
import TokenUtils from 'src/utils/token-utils';

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    if (!accessToken) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    const accessTokenPayload = TokenUtils.verifyToken(accessToken);
    const refreshTokenPayload = TokenUtils.verifyToken(refreshToken);

    if (!accessTokenPayload) {
      if (!refreshTokenPayload) {
        throw new UnauthorizedError('Unauthorized');
      }

      const newToken = TokenUtils.generateAccessToken(
        refreshTokenPayload.userId,
      );

      createAccessCookie(res, newToken);
    }

    req.app.locals.userId =
      accessTokenPayload?.userId ?? refreshTokenPayload?.userId;
    return next();
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }
}
