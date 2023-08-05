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
import { LogoutRequestDto } from './dto/logout-request.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

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

  async loginTest() {
    return 'Haha';
  }

  async login(loginRequestDto: LoginRequestDto) {
    try {
      const existedAccount = await this._accountRepository.findOne({
        where: { email: loginRequestDto.email },
        relations: ['profile'],
      });
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
          email: registerRequestDto.email,
        },
        {
          secret: this._configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this._configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
        },
      );

      const createdAccount = await this._profileRepository.save(
        this._profileRepository.create({
          account: this._accountRepository.create({
            email: registerRequestDto.email,
            password: hashPassword,
            refreshToken: refreshToken,
          }),
        }),
      );

      const accessToken: string = await this._jwtService.sign({
        email: registerRequestDto.email,
        accountId: createdAccount.id,
      });
      return { accessToken, refreshToken: refreshToken };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async logout(accountId: number, logoutRequestDto: LogoutRequestDto) {
    try {
      const account = await this._accountRepository.findOne({
        where: { id: accountId, refreshToken: logoutRequestDto.refreshToken },
      });
      await this._accountRepository.update(account.id, { refreshToken: '' });
      return 'Logout successfully';
    } catch (error) {
      throw new BadRequestException(error.sqlMessage || error.message);
    }
  }

  async resetPassword(body: ResetPasswordDto) {
    try {
      // Gửi mail link để người dùng reset password
      console.log(body);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async changePassword(body: ChangePasswordDto, user) {
    try {
      if (body.newPassword !== body.confirmPassword) {
        throw new BadRequestException('Password and confirm password is not match');
      }
      const existedAccount = await this._accountRepository.findOne({
        where: { id: user.accountId },
      });
      if (!existedAccount) {
        throw new NotFoundException('User is not registered');
      }
      const isMatchPassword = await bcrypt.compare(body.oldPassword, existedAccount.password);
      if (!isMatchPassword) {
        throw new BadRequestException('Password is not correct');
      }
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(body.newPassword, salt);
      await this._accountRepository.update(existedAccount.id, { password: hashPassword });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async refreshToken(body: RefreshTokenRequestDto) {
    try {
      const isValidRefreshToken = await this._jwtService.verifyAsync(body.refreshToken, {
        secret: this._configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });
      if (!isValidRefreshToken) {
        throw new BadRequestException('Refresh token is not valid');
      }
      const existedAccount = await this._accountRepository.findOne({ where: { refreshToken: body.refreshToken } });
      if (!existedAccount) {
        throw new NotFoundException('User not found');
      }

      const refreshToken = await this._jwtService.sign(
        {
          email: isValidRefreshToken.email,
        },
        {
          secret: this._configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this._configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
        },
      );

      await this._accountRepository.update(existedAccount.id, { refreshToken });

      const accessToken: string = await this._jwtService.sign({
        email: isValidRefreshToken.email,
        accountId: existedAccount.id,
      });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
