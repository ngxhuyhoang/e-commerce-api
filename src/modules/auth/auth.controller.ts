import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { Public } from '@decorators/public.decorator';
import { AuthUser } from '@decorators/auth-user.decorator';
import { LogoutRequestDto } from './dto/logout-request.dto';
import { ResponseMessage } from '@decorators/response.decorator';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';

@Controller('auth')
@ApiTags('Xác thực người dùng')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ deprecated: false })
  @ResponseMessage('Đăng nhập thành công')
  @Public()
  async login(@Body() loginRequestDto: LoginRequestDto) {
    return await this.authService.login(loginRequestDto);
  }

  @Post('register')
  @Public()
  @ApiBody({ type: RegisterRequestDto })
  @ApiOperation({ summary: 'Người dùng cuối đăng ký tài khoản', deprecated: false })
  async register(@Body() registerRequestDto: RegisterRequestDto) {
    return await this.authService.register(registerRequestDto);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ deprecated: false })
  async logout(@AuthUser() user: any, @Body() logoutRequestDto: LogoutRequestDto) {
    return await this.authService.logout(user, logoutRequestDto);
  }

  @Post('forgot-password')
  @ApiBearerAuth()
  @ApiOperation({ deprecated: true })
  async forgotPassword() {
    return await this.authService.forgotPassword();
  }

  @Post('reset-password')
  @ApiBearerAuth()
  @ApiOperation({ deprecated: true })
  async resetPassword() {
    return await this.authService.resetPassword();
  }

  @Post('change-password')
  @ApiBearerAuth()
  @ApiOperation({ deprecated: true })
  async changePassword() {
    return await this.authService.changePassword();
  }

  @Post('refresh-token')
  @ApiBearerAuth()
  @ApiOperation({ deprecated: false })
  async refreshToken(@Body() body: RefreshTokenRequestDto) {
    return await this.authService.refreshToken(body);
  }
}
