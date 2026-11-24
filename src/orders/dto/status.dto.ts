import { IsEnum } from 'class-validator';
import { OrderStatus, orderStatusList } from '../enum';

export class StatusDto {
  @IsEnum(orderStatusList, {
    message: `status must be one of the following values: ${Object.values(
      orderStatusList,
    ).join(', ')}`,
  })
  status: OrderStatus;
}
