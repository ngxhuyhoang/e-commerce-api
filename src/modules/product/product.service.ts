import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly _productRepository: Repository<ProductEntity>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const productCreated = await this._productRepository.create({
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
      });
      await this._productRepository.save(productCreated);
      return productCreated;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(id: number) {
    try {
      const product = await this._productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException('Không tìm thấy sản phẩm');
      }
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this._productRepository.findOneBy({ id });
      if (!product) {
        throw new NotFoundException('Không tìm thấy sản phẩm');
      }
      await this._productRepository.save({
        name: updateProductDto.name,
        description: updateProductDto.description,
        price: updateProductDto.price,
      });
      return { ...product, ...updateProductDto };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
