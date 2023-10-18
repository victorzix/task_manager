import { StatusCodes } from "http-status-codes";
import { AppError } from "./app-error";

export class UnauthorizedError extends AppError{
  constructor(message:string) {
    super(StatusCodes.UNAUTHORIZED, message)
  }
}