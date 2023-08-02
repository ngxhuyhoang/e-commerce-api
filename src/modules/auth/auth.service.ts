import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login-request.dto';
import { Repository } from 'typeorm';
import { AccountEntity } from '@modules/account/entities/account.entity';
import { ProfileEntity } from '@modules/profile/entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { RegisterRequestDto } from './dto/register-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _jwtService: JwtService,

    @InjectRepository(AccountEntity)
    private readonly _accountRepository: Repository<AccountEntity>,

    @InjectRepository(ProfileEntity)
    private readonly _profileRepository: Repository<ProfileEntity>,

    private readonly _configService: ConfigService,
  ) {}

  async login(loginRequestDto: LoginRequestDto) {
    try {
      const existedAccount = await this._accountRepository.findOne({ where: { email: loginRequestDto.email } });
      if (!existedAccount) {
        throw new NotFoundException('User is not registered');
      }
      const isMatchPassword = await bcrypt.compare(loginRequestDto.password, existedAccount.password);
      if (!isMatchPassword) {
        throw new BadRequestException('Password is not correct');
      }
      const accessToken: string = await this._jwtService.sign({
        accountId: existedAccount.id,
        userId: existedAccount.profile.id,
        email: loginRequestDto.email,
      });
      const refreshToken = await this._jwtService.sign(
        {
          userId: existedAccount.profile.id,
          email: existedAccount.email,
        },
        {
          secret: this._configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this._configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
        },
      );
      await this._accountRepository.update(existedAccount.id, { refreshToken });
      return { accessToken, refreshToken: refreshToken };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async register(registerRequestDto: RegisterRequestDto) {
    try {
      if (registerRequestDto.password !== registerRequestDto.confirmPassword) {
        throw new BadRequestException('Password and confirm password is not match');
      }
      const registeredAccount = await this._accountRepository.findOne({ where: { email: registerRequestDto.email } });
      if (registeredAccount) {
        throw new BadRequestException('Email already exists');
      }
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(registerRequestDto.password, salt);
      const refreshToken = await this._jwtService.sign(
        {
          userId: registeredAccount.profile.id,
          email: registeredAccount.email,
        },
        {
          secret: this._configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this._configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
        },
      );
      const account = await this._accountRepository.save(
        this._accountRepository.create({
          email: registerRequestDto.email,
          password: hashPassword,
          refreshToken: refreshToken,
        }),
      );
      const savedUser = await this._profileRepository.save({ account });
      const accessToken: string = await this._jwtService.sign({
        userId: savedUser.id,
        email: registerRequestDto.email,
      });
      return { accessToken, refreshToken: refreshToken };
    } catch (error) {
      throw new BadRequestException(error.sqlMessage || error.message);
    }
  }

  logout() {}

  forgotPassword() {
    return 'forgot password';
  }

  resetPassword() {}

  changePassword() {}

  refreshToken() {}
}
