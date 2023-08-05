import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenRequestDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
