import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ResourceNotFoundError } from "../../application/errors/resource-not-found-error";
import { FastifyReply } from "fastify";

@Catch(ResourceNotFoundError)
export class ResourceNotFoundErrorFilter implements ExceptionFilter {
  catch(exeption: ResourceNotFoundError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(exeption.statusCode).send({
      statusCode: exeption.statusCode,
      error: 'Bad Request',
      message: exeption.message,
    })
  }
}