import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload extends JwtPayload {
  userId: string;
}

export class TokenUtils {
  generateAccessToken(userId: string): string {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: '3h',
    });
    return token;
  }

  generateRefreshToken(userId: string): string {
    const refreshToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
      },
    );
    return refreshToken;
  }

  verifyToken(token: string) {
    try {
      const verify = jwt.verify(token, process.env.JWT_SECRET as string);
      return verify as TokenPayload;
    } catch (err: any) {
      return null;
    }
  }
}

export default new TokenUtils();
