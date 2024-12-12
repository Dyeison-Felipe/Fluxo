import { HttpError } from "src/shared/domain/http-error/http-error";

export class ResourceNotFoundError extends HttpError {
  constructor(message: string = 'Resource not found') {
    super(message, 404)
    this.name = 'ResourceNotFoundError'
  }
}