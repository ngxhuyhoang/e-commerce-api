import { RoleDto } from '@modules/role/dto/role.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  apiMethod: string;

  @ApiProperty()
  apiEndpoint: string;

  @ApiPropertyOptional()
  @IsOptional()
  roles: RoleDto[];
}
