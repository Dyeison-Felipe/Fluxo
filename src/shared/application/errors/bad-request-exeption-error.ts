import { HttpError } from "src/shared/domain/http-error/http-error";

export class BadRequestExeptionError extends HttpError {
  constructor(message: string = '') {
    super(message, 400)
    this.name = 'BadRequestExeptionError'
  }
}