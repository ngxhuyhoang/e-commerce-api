import { Controller, Get, Post, Param, Delete, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';

@Controller('account')
@ApiTags('Tài khoản')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('user')
  @ApiOperation({ summary: 'Tạo tài khoản cho cấp dưới', deprecated: false })
  create() {
    return this.accountService.create();
  }

  @Get('list')
  @ApiOperation({ summary: 'Danh sách tài khoản cấp dưới', deprecated: false })
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy một tài khoản cấp dưới', deprecated: false })
  findOne(@Param('id') id: string) {
    return this.accountService.findOne(+id);
  }

  @Delete(':id/delete')
  @ApiOperation({ summary: 'Xóa tài khoản cấp dưới', deprecated: false })
  remove(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }

  @Post(':id/lock')
  @ApiOperation({ summary: 'Khóa tài khoản cấp dưới', deprecated: false })
  lock(@Param('id') id: string) {
    return this.accountService.remove(+id);
  }
}
