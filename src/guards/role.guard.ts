import { MetadataKey } from '@constants/enum';
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
    return true;
  }
}
