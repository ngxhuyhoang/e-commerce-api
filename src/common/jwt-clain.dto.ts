import { ApiProperty } from '@nestjs/swagger';

export class JwtClaimDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  exp: number;

  @ApiProperty()
  iat: number;
}
