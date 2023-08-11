import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { ResponseMessage } from '@decorators/response.decorator';
import { ProductDto } from './dto/product.dto';

@Controller('product')
@ApiTags('Sản phẩm')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ deprecated: false })
  @ResponseMessage('Tạo sản phẩm thành công')
  @ApiOkResponse({ description: 'Tạo sản phẩm thành công', type: CreateProductDto })
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ deprecated: false })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id/get-one')
  @ApiOperation({ deprecated: false })
  @ApiOkResponse({ type: ProductDto })
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id/update')
  @ApiOperation({ deprecated: false })
  @ApiOkResponse({ type: ProductDto })
  async update(@Param('id', new ParseIntPipe()) id: number, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ deprecated: false })
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
