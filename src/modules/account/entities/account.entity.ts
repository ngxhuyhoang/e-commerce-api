import { BasedEntity } from '@common/based.entity';
import { CartEntity } from '@modules/cart/entities/cart.entity';
import { ProfileEntity } from '@modules/profile/entities/profile.entity';
import { RoleEntity } from '@modules/role/entities/role.entity';
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity({ name: 'account' })
export class AccountEntity extends BasedEntity {
  @Column()
  @Index()
  email: string;

  @Column()
  password: string;

  @Column()
  @Index()
  refreshToken: string;

  @OneToOne(() => ProfileEntity, (profile) => profile.account)
  profile: ProfileEntity;

  @OneToMany(() => RoleEntity, (role) => role.account)
  @JoinColumn()
  roles: RoleEntity[];

  @OneToOne(() => CartEntity, (cart) => cart.cartOwner)
  cart: CartEntity;
}
