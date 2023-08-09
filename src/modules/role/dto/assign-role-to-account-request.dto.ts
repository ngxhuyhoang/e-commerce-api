import { ApiProperty } from '@nestjs/swagger';

export class AssignRoleToAccountDto {
  @ApiProperty()
  roleId: number;

  @ApiProperty()
  accountId: number;
}
