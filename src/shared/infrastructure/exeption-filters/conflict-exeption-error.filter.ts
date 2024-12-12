import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ResourceNotFoundError } from "../../application/errors/resource-not-found-error";
import { FastifyReply } from "fastify";
import { ConflictExeptionError } from "../../application/errors/conflict-exeption-error";

@Catch(ConflictExeptionError)
export class ConflictExeptionErrorFilter implements ExceptionFilter {
  catch(exeption: ConflictExeptionError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(exeption.statusCode).send({
      statusCode: exeption.statusCode,
      error: 'Conflict',
      message: exeption.message,
    })
  }
}