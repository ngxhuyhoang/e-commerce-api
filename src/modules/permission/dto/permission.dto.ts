import { BasedDto } from '@common/based.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PermissionEntity } from '../entities/permission.entity';

export class PermissionDto extends BasedDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  apiMethod: string;

  @ApiProperty()
  apiEndpoint: string;

  constructor(entity: PermissionEntity) {
    super(entity);

    this.name = entity.name;
    this.description = entity.description;
    this.apiMethod = entity.apiMethod;
  }
}
