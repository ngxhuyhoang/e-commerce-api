import { BasedEntity } from '@common/based.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'carts' })
export class CartEntity extends BasedEntity {
  @Column()
  productId: number;

  @Column()
  quantity: number;
}
