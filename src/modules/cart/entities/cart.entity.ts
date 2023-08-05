import { BasedEntity } from '@common/based.entity';
import { AccountEntity } from '@modules/account/entities/account.entity';
import { ProductEntity } from '@modules/product/entities/product.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'carts' })
export class CartEntity extends BasedEntity {
  @OneToMany(() => ProductEntity, (product) => product.cart, { cascade: true })
  @JoinColumn()
  products: ProductEntity[];

  @Column()
  quantity: number;

  @OneToOne(() => AccountEntity, (account) => account.cart, { cascade: true })
  @JoinColumn()
  cartOwner: AccountEntity;
}
