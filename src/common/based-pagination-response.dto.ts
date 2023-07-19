import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationMeta {
  @ApiProperty()
  next: string;

  @ApiPropertyOptional()
  prev: string;

  @ApiProperty()
  limit: number;

  constructor(next: string, limit: number, prev: string) {
    this.next = next;
    this.prev = prev;
    this.limit = limit;
  }
}

export class BasedPaginationResponseDto<T> {
  readonly data: T[];
  readonly meta: PaginationMeta;
}
