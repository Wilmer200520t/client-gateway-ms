import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

import { OrderStatus, orderStatusList } from '../enum';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  totalAmount: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  totalItems: number;

  @IsNotEmpty()
  @IsEnum(orderStatusList, {
    message: `status must be one of the following values: ${Object.values(
      orderStatusList,
    ).join(', ')}`,
  })
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;

  @IsBoolean()
  @IsOptional()
  paid: Boolean = false;
}
