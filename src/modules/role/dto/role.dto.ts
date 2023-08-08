import { BasedDto } from '@common/based.dto';
import { PermissionDto } from '@modules/permission/dto/permission.dto';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../entities/role.entity';

export class RoleDto extends BasedDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  permissions: PermissionDto[];

  constructor(entity: RoleEntity) {
    super(entity);

    this.name = entity.name;
    this.permissions = entity.permissions.map((permission) => new PermissionDto(permission));
  }
}
