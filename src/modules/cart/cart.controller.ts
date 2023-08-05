import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthUser, AuthUserDto } from '@decorators/auth-user.decorator';

@Controller('cart')
@ApiTags('Giỏ hàng')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('update')
  @ApiOperation({ summary: 'Cập nhật giỏ hàng', deprecated: false })
  updateCart(@Body() updateCartDto: UpdateCartDto, @AuthUser() user: AuthUserDto) {
    return this.cartService.updateCart(updateCartDto, user);
  }

  @Get('list')
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm trong giỏ hàng', deprecated: false })
  findAll() {
    return this.cartService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa sản phẩm trong giỏ hàng', deprecated: false })
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
