import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { Transport } from '@nestjs/microservices/enums/transport.enum';
import { ClientsModule } from '@nestjs/microservices/module/clients.module';
import { envs, ORDER_SERVICE } from '../config';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.ORDER_SERVICE_HOST,
          port: envs.ORDER_SERVICE_PORT,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
