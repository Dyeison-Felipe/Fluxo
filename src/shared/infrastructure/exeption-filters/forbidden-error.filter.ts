import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ForbiddenError } from 'src/shared/application/errors/forbidden-error';

@Catch(ForbiddenError)
export class ForbiddenErrorFilter implements ExceptionFilter {
  catch(exception: ForbiddenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    response.status(exception.statusCode).send({
      statusCode: exception.statusCode,
      error: 'Forbidden',
      message: exception.message,
    });
  }
}