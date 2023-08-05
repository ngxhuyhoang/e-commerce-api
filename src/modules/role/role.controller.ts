import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '@decorators/response.decorator';

@Controller('role')
@ApiTags('Vai trò')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  @ApiOperation({ deprecated: true })
  create() {
    return this.roleService.create();
  }

  @Get('get-all-role')
  @ResponseMessage('Get all role success')
  @ApiOperation({ deprecated: true })
  findAll() {
    return this.roleService.findAll();
  }

  @Get('get-single/:id')
  @ApiOperation({ deprecated: true })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ deprecated: true })
  update(@Param('id') id: string) {
    return this.roleService.update(+id);
  }

  @Delete(':id')
  @ApiOperation({ deprecated: true })
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
