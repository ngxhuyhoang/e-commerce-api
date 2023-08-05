import { BasedDto } from '@common/based.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto extends BasedDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;
}
