import {
  ArgumentsHost,
  ExceptionFilter,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const rpcContext = host.switchToHttp();
    const errorResponse = rpcContext.getResponse();
    const rpcError = exception.getError();

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      errorResponse.status(rpcError.status).json({
        statusCode: rpcError.status,
        message: rpcError.message,
      });
    } else {
      errorResponse.status(400).json({
        statusCode: 400,
        message: rpcError,
      });
    }
  }
}
