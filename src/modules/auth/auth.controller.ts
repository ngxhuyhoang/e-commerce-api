import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { Public } from '@decorators/public.decorator';
import { AuthUser } from '@decorators/auth-user.decorator';
import { LogoutRequestDto } from './dto/logout-request.dto';

@Controller('auth')
@ApiTags('Authentication/Authorization')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return await this.authService.login(loginRequestDto);
  }

  @Post('register')
  @Public()
  @ApiBody({ type: RegisterRequestDto })
  async register(@Body() registerRequestDto: RegisterRequestDto) {
    return await this.authService.register(registerRequestDto);
  }

  @Post('logout')
  @ApiBearerAuth()
  async logout(@AuthUser() user: any, @Body() logoutRequestDto: LogoutRequestDto) {
    return await this.authService.logout(user, logoutRequestDto);
  }

  @Post('forgot-password')
  @ApiOperation({ deprecated: true })
  @ApiBearerAuth()
  async forgotPassword() {
    return await this.authService.forgotPassword();
  }

  @Post('reset-password')
  @ApiOperation({ deprecated: true })
  @ApiBearerAuth()
  async resetPassword() {
    return await this.authService.resetPassword();
  }

  @Post('change-password')
  @ApiOperation({ deprecated: true })
  @ApiBearerAuth()
  async changePassword() {
    return await this.authService.changePassword();
  }

  @Post('refresh-token')
  @ApiOperation({ deprecated: true })
  @ApiBearerAuth()
  async refreshToken() {
    return await this.authService.refreshToken();
  }
}
