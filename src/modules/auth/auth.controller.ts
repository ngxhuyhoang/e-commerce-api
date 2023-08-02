import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';

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
  @ApiBody({ type: RegisterRequestDto })
  async register(@Body() registerRequestDto: RegisterRequestDto) {
    return await this.authService.register(registerRequestDto);
  }

  @Post('logout')
  @ApiOperation({ deprecated: true })
  async logout() {
    return await this.authService.logout();
  }

  @Post('forgot-password')
  @ApiOperation({ deprecated: true })
  async forgotPassword() {
    return await this.authService.forgotPassword();
  }

  @Post('reset-password')
  @ApiOperation({ deprecated: true })
  async resetPassword() {
    return await this.authService.resetPassword();
  }

  @Post('change-password')
  @ApiOperation({ deprecated: true })
  async changePassword() {
    return await this.authService.changePassword();
  }

  @Post('refresh-token')
  @ApiOperation({ deprecated: true })
  async refreshToken() {
    return await this.authService.refreshToken();
  }
}
