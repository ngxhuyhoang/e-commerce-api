import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WarehouseProductService } from './warehouse-product.service';
import { CreateWarehouseProductDto } from './dto/create-warehouse-product.dto';
import { UpdateWarehouseProductDto } from './dto/update-warehouse-product.dto';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('warehouse-product')
@ApiTags('Kho - Sản phẩm')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WarehouseProductController {
  constructor(private readonly warehouseProductService: WarehouseProductService) {}

  @Post()
  create() {
    return this.warehouseProductService.create();
  }

  @Get()
  findAll() {
    return this.warehouseProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehouseProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.warehouseProductService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehouseProductService.remove(+id);
  }
}
