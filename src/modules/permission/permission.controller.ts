import { Controller, Get, Post, Patch, Param, Delete, UseGuards, Body } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@decorators/role.decorator';
import { RolesGuard } from '@guards/role.guard';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Controller('permission')
@ApiTags('Quyền')
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @Roles('Hahah')
  @ApiOperation({ deprecated: false })
  create(@Body() body: CreatePermissionDto) {
    return this.permissionService.create(body);
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
