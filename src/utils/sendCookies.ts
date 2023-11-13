import { Response } from 'express';

export async function createAccessCookie(res: Response, payload: string): Promise<void> {
  res.cookie('access_token', payload, {
    httpOnly: true,
    path: '/',
    secure: true,
  });
  return;
}

export async function createRefreshCookie(res: Response, payload: string): Promise<void> {
  res.cookie('refresh_token', payload, {
    httpOnly: true,
    path: '/',
    secure: true,
  });
  return;
}
