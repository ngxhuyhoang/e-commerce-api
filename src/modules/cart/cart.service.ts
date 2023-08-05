import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '@modules/account/entities/account.entity';
import { AuthUserDto } from '@decorators/auth-user.decorator';
import { ProductEntity } from '@modules/product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly _cartRepository: Repository<CartEntity>,

    @InjectRepository(AccountEntity)
    private readonly _accountRepository: Repository<AccountEntity>,

    @InjectRepository(ProductEntity)
    private readonly _productRepository: Repository<ProductEntity>,
  ) {}

  async updateCart(updateCartDto: UpdateCartDto, user: AuthUserDto) {
    try {
      const account = await this._accountRepository.findOne({ where: { id: user.accountId } });
      if (!account) {
        throw new NotFoundException('Tài khoản không tồn tại');
      }
      const product = await this._productRepository.find({ where: { id: updateCartDto.productId } });
      if (!product.length) {
        throw new NotFoundException('Sản phẩm không tồn tại');
      }
      return 'Thành công';
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    console.log(updateCartDto);
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
