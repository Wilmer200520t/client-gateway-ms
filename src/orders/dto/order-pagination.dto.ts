import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../common';
import { OrderStatus, orderStatusList } from '../enum';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(orderStatusList, {
    message: `status must be one of the following values: ${Object.values(
      orderStatusList,
    ).join(', ')}`,
  })
  status?: OrderStatus;
}
