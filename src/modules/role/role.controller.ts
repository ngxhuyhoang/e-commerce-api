import { Controller, Get, Post, Patch, Param, Delete, UseGuards, Body, ParseIntPipe } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from '@decorators/response.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { AssignRoleToAccountDto } from './dto/assign-role-to-account-request.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

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
  @ApiOperation({ deprecated: false })
  findAll() {
    return this.roleService.findAll();
  }

  @Get('get-single/:id')
  @ApiOperation({ deprecated: false })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ deprecated: false })
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ deprecated: false })
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.roleService.remove(id);
  }

  @Post('assign-role-to-account')
  @ApiOperation({ deprecated: false })
  async assignRoleToAccount(@Body() body: AssignRoleToAccountDto) {
    return await this.roleService.assignRoleToAccount(body);
  }
}
