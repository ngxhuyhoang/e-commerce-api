import { Controller, Get, Post, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@decorators/role.decorator';
import { RolesGuard } from '@guards/role.guard';

@Controller('permission')
@ApiTags('Quyền')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @Roles('Hahah')
  @UseGuards(RolesGuard)
  @ApiOperation({ deprecated: true })
  create() {
    return this.permissionService.create();
  }

  @Get()
  @ApiOperation({ deprecated: true })
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ deprecated: true })
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ deprecated: true })
  update(@Param('id') id: string) {
    return this.permissionService.update(+id);
  }

  @Delete(':id')
  @ApiOperation({ deprecated: true })
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}
