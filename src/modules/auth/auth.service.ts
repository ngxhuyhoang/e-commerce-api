import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login-request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(loginRequestDto: LoginRequestDto) {
    try {
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  register() {}

  logout() {}

  forgotPassword() {
    return 'forgot password';
  }

  resetPassword() {}

  changePassword() {}

  refreshToken() {}
}
