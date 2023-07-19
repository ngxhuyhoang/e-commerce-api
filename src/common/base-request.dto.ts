import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BaseRequestDto {
  @ApiPropertyOptional()
  keyword?: string;

  @ApiPropertyOptional()
  @IsNumber()
  limit?: number = 20;

  @ApiPropertyOptional()
  @IsNumber()
  offset?: number;

  @ApiPropertyOptional()
  fromDate: Date;

  @ApiPropertyOptional()
  toDate: Date;
}
