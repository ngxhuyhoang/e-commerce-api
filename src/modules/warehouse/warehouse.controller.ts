import { Controller, Get, Post, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';

@Controller('warehouse')
@ApiTags('Kho')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  create() {
    return this.warehouseService.create();
  }

  @Get()
  findAll() {
    return this.warehouseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.warehouseService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehouseService.remove(+id);
  }
}
