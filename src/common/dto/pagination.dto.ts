import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';
import { envs } from '../../config';

export class PaginationDto {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number = envs.PAGINATION_DEFAULT_PAGE;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit?: number = envs.PAGINATION_DEFAULT_LIMIT;
}
