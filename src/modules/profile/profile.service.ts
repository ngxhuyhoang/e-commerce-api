import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDto } from '@decorators/auth-user.decorator';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly _profileRepository: Repository<ProfileEntity>,
  ) {}

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const existedProfile = await this._profileRepository.findOne({ where: { id } });
      if (!existedProfile) {
        throw new NotFoundException('Profile is not found');
      }
      await this._profileRepository.update(id, updateProfileDto);
      return updateProfileDto;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getCurrentUser(user: AuthUserDto) {
    try {
      const existedProfile = await this._profileRepository.findOne({ where: { id: user.userId } });
      if (!existedProfile) {
        throw new NotFoundException('Profile is not found');
      }
      console.log(existedProfile);
      return existedProfile;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
