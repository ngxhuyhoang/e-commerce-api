import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { LoginRequestDto } from './dto/login-request.dto';

@Controller('auth')
@ApiTags('Authentication/Authorization')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return await this.authService.login(loginRequestDto);
  }

  @Post('register')
  async register() {
    return await this.authService.register();
  }

  @Post('logout')
  async logout() {
    return await this.authService.logout();
  }

  @Post('forgot-password')
  async forgotPassword() {
    return await this.authService.forgotPassword();
  }

  @Post('reset-password')
  async resetPassword() {
    return await this.authService.resetPassword();
  }

  @Post('change-password')
  async changePassword() {
    return await this.authService.changePassword();
  }

  @Post('refresh-token')
  async refreshToken() {
    return await this.authService.refreshToken();
  }
}
