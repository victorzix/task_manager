import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  constructor(
    public readonly statusCode: StatusCodes,
    message: string,
  ) {
    super(message);
  }
}
