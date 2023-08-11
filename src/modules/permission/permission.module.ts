import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';
import { RoleEntity } from '@modules/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity, RoleEntity])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
