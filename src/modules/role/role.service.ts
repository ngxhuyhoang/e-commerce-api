import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponse } from '@common/base-response.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignRoleToAccountDto } from './dto/assign-role-to-account-request.dto';
import { AccountEntity } from '@modules/account/entities/account.entity';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly _roleRepository: Repository<RoleEntity>,

    @InjectRepository(AccountEntity)
    private readonly _accountRepository: Repository<AccountEntity>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const result = await this._roleRepository.save({
        name: createRoleDto.name,
        permissions: createRoleDto.permissions,
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const [result, count] = await this._roleRepository.findAndCount();
      return new BaseResponse<RoleEntity>(result, { page: 1, totalRecord: count });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this._roleRepository.findOne({ where: { id } });
      if (!result) throw new BadRequestException('Role not found');
      return new BaseResponse<RoleEntity>(result, { page: 1, totalRecord: 1 });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: number) {
    return `This action updates a #${id} role`;
  }

  async remove(id: number, body: UpdateRoleDto) {
    try {
      await this._roleRepository.save({ id, ...body });
      return 'Thành công';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async assignRoleToAccount(body: AssignRoleToAccountDto) {
    try {
      const existedAccount = await this._accountRepository.findOne({ where: { id: body.accountId } });
      if (!existedAccount) {
        throw new NotFoundException('Account not found');
      }
      await this._roleRepository.update({ id: body.roleId }, { account: existedAccount });
      return 'Thành công';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
