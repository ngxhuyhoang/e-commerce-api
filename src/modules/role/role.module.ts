import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { AccountEntity } from '@modules/account/entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, AccountEntity])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
