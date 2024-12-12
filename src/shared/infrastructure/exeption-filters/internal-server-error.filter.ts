import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ResourceNotFoundError } from "../../application/errors/resource-not-found-error";
import { FastifyReply } from "fastify";
import { InternalServerError } from "src/shared/application/errors/internal-server-error";

@Catch(InternalServerError)
export class InternalServerErrorFilter implements ExceptionFilter {
  catch(exeption: InternalServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(exeption.statusCode).send({
      statusCode: exeption.statusCode,
      error: 'Internal Server',
      message: exeption.message,
    })
  }
}