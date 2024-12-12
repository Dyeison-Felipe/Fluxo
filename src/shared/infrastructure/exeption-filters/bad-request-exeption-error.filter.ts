import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { BadRequestExeptionError } from "src/shared/application/errors/bad-request-exeption-error";

@Catch(BadRequestExeptionError)
export class BadRequestExeptionErrorFilter implements ExceptionFilter {
  catch(exeption: BadRequestExeptionError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(exeption.statusCode).send({
      statusCode: exeption.statusCode,
      error: 'BadRequest',
      message: exeption.message,
    })
  }
}