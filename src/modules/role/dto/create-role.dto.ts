import { PermissionDto } from '@modules/permission/dto/permission.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ isArray: true, type: PermissionDto })
  @Type(() => PermissionDto, {})
  permissions: PermissionDto[];
}
