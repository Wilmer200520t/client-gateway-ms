import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): void {
    const rpcContext = host.switchToHttp();
    const errorResponse = rpcContext.getResponse();
    const rpcError = exception.getError();

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError &&
      typeof rpcError.status === 'number' &&
      (typeof rpcError.message === 'string' || Array.isArray(rpcError.message))
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
