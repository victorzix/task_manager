import { AppError } from "./app-error";
import { StatusCode } from "./statusCode.enum";

export class BadRequestError extends AppError{
  constructor(message:string) {
    super(StatusCode.BADREQUEST, message)
  }
}