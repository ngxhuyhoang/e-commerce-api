import { BasedEntity } from '@common/based.entity';
import { CartEntity } from '@modules/cart/entities/cart.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity extends BasedEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @ManyToOne(() => CartEntity, (cart) => cart.products)
  cart: CartEntity;
}
