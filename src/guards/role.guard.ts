import { MetadataKey } from '@constants/enum';
import { RoleEntity } from '@modules/role/entities/role.entity';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<boolean>(MetadataKey.ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(roles);
    return true;
  }
}
