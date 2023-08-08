import { MetadataKey } from '@constants/enum';
import { AuthUserDto } from '@decorators/auth-user.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<boolean>(MetadataKey.ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(roles);
    const request = context.switchToHttp().getRequest();
    const authUser: AuthUserDto = request.user;
    console.log('request', request);
    console.log('authUser', authUser);
    const targetMethod: string = request.method;
    const targetUrl: string = request.url;
    console.log('targetMethod', targetMethod);
    console.log('targetUrl', targetUrl);
    return true;
  }
}
