import { PermissionDto } from '@modules/permission/dto/permission.dto';
import { RoleDto } from '@modules/role/dto/role.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class AuthUserDto {
  userId: number;
  accountId: number;
  username: string;
  email: string;
  roles: RoleDto[];
  permissions: PermissionDto[];
}

export const AuthUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
