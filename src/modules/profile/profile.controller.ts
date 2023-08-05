import { Controller, Get, Body, Patch, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser, AuthUserDto } from '@decorators/auth-user.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';

@Controller('profile')
@ApiTags('Thông tin cá nhân')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @ApiOperation({ summary: 'Lấy thông tin cá nhân của user đăng nhập', deprecated: false })
  async getCurrentUser(@AuthUser() user: AuthUserDto) {
    return await this.profileService.getCurrentUser(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin cá nhân của một user', deprecated: false })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id/update')
  @ApiOperation({ summary: 'Cập nhật thông tin của một user', deprecated: false })
  update(@Param('id', new ParseIntPipe()) id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }
}
