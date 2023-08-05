import { ApiProperty } from '@nestjs/swagger';

export class UpdateCartDto {
  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  cartOwnerId: number;
}
