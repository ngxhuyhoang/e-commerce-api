import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class AuthUserDto {
  userId: number;
  accountId: number;
  username: string;
  email: string;
  role: string;
  permissions: string[];
}

export const AuthUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
