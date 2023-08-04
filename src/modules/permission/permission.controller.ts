import { Controller, Get, Post, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@decorators/role.decorator';
import { RolesGuard } from '@guards/role.guard';

@Controller('permission')
@ApiTags('Permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @Roles('Hahah')
  @UseGuards(RolesGuard)
  create() {
    return this.permissionService.create();
  }

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.permissionService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}
