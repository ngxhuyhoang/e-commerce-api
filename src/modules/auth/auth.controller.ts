import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Authentication/Authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login() {
    return await this.authService.login();
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
