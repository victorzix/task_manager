import { Response } from 'express';

export async function createAccessCookie(res: Response, payload: string): Promise<void> {
  res.cookie('access_token', payload, {
    path: '/',
    secure: false,
  });
  return;
}

export async function createRefreshCookie(res: Response, payload: string): Promise<void> {
  res.cookie('refresh_token', payload, {
    path: '/',
    secure: false,
  });
  return;
}
