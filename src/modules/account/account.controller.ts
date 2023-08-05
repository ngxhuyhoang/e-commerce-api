import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('account')
@ApiTags('Tài khoản')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('user')
  @ApiOperation({ deprecated: true })
  @ApiOperation({ summary: 'Tạo tài khoản' })
  create() {
    return this.accountService.create();
  }

  @Get()
  @ApiOperation({ deprecated: true })
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  @ApiOperation({ deprecated: true })
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ deprecated: true })
  update(@Param('id') id: string) {
    return this.accountService.update(+id);
  }

  @Delete(':id')
  @ApiOperation({ deprecated: true })
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
