import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

interface IExceptionOptions {
  options: {
    name: string;
  };
}
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const entityName = (exception as IExceptionOptions)?.options?.name;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = (exception as Error).message;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();

      if (typeof message === 'object') {
        message = Object.values(message)[0];
        response.status(status).json({
          message,
          statusCode: status,
          path: request.url,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: (exception as Error).message,
      });
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';

      if (exception.code === 'P2002') {
        status = HttpStatus.CONFLICT;
        message = `${entityName} c таким именем уже существует`;
      } else if (exception.code === 'P2025') {
        status = HttpStatus.NOT_FOUND;
        message = `${entityName} с таким идентификатором не существует`;
      }

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: message,
      });
    } else {
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
    }
  }
}
