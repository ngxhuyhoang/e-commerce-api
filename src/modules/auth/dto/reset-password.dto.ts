import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty()
  @IsString()
  newPassword: string;

  @ApiProperty()
  @IsString()
  confirmPassword: string;
}
