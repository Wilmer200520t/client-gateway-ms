import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus, orderStatusList } from '../enum';
import { PaginationDto } from '../../common';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(orderStatusList, {
    message: `status must be one of the following values: ${Object.values(
      orderStatusList,
    ).join(', ')}`,
  })
  status?: OrderStatus;
}
