import { ORDER_SERVICE } from '../config';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Logger,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices/client/client-proxy';
import { RpcException } from '@nestjs/microservices/exceptions/rpc-exception';
import { catchError } from 'rxjs/internal/operators/catchError';
import { CreateOrderDto, OrderPaginationDto } from './dto';
import { PaginationDto } from '../common';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersService: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService
      .send({ cmd: 'create_order' }, createOrderDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.ordersService
      .send({ cmd: 'find_all_orders' }, paginationDto)
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.send({ cmd: 'find_one_order' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get(':status')
  findAllByStatus(
    @Param() status: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.ordersService
      .send(
        { cmd: 'find_all_orders_by_status' },
        { ...status, ...paginationDto },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Patch('status/:id')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() status: Boolean,
  ) {
    return this.ordersService
      .send({ cmd: 'change_order_status' }, { id, status })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
