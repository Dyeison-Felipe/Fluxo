import { HttpError } from "src/shared/domain/http-error/http-error";

export class ConflictExeptionError extends HttpError {
  constructor(message: string = 'data conflict') {
    super(message, 409)
    this.name = 'ConflictExeptionError'
  }
}