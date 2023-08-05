import { BasedEntity } from '@common/based.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity extends BasedEntity {
  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  description: string;
}
