import { HttpError } from "src/shared/domain/http-error/http-error";

export class InternalServerError extends HttpError {
  constructor(message: string = 'A internal server error occurred') {
    super(message, 409)
    this.name = 'InternalServerError'
  }
}