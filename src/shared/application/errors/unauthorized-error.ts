import { HttpError } from "src/shared/domain/http-error/http-error";

export class UnauthorizedError extends HttpError {
  constructor(public message: string = 'Unauthorized') {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}