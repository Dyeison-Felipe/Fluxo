import { HttpError } from "src/shared/domain/http-error/http-error";

export class ForbiddenError extends HttpError {
  constructor(public message: string = 'Forbidden') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}