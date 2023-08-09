import { Controller, Get, Post, Patch, Param, Delete, UseGuards, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '@decorators/response.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignRoleToAccountDto } from './dto/assign-role-to-account-request.dto';

@Controller('role')
@ApiTags('Vai trò')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  @ApiOperation({ deprecated: false })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
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

  @Post('assign-role-to-account')
  @ApiOperation({ deprecated: false })
  async assignRoleToAccount(@Body() body: AssignRoleToAccountDto) {
    return await this.roleService.assignRoleToAccount(body);
  }
}
