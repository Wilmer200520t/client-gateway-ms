import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-custom-exception.filter';

@Module({
  imports: [ProductsModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: RpcCustomExceptionFilter,
    },
  ],
})
export class AppModule {}
