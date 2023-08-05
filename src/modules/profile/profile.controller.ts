import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('profile')
@ApiTags('Thông tin cá nhân')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  @ApiOperation({ deprecated: true })
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ deprecated: true })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }
}
