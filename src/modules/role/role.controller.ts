import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '@decorators/response.decorator';

@Controller('role')
@ApiTags('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  create() {
    return this.roleService.create();
  }

  @Get('get-all-role')
  @ResponseMessage('Get all role success')
  findAll() {
    return this.roleService.findAll();
  }

  @Get('get-single/:id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.roleService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
