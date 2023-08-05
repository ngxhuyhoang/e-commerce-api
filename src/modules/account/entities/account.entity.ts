import { BasedEntity } from '@common/based.entity';
import { ProfileEntity } from '@modules/profile/entities/profile.entity';
import { RoleEntity } from '@modules/role/entities/role.entity';
import { Column, Entity, Index, OneToMany, OneToOne } from 'typeorm';

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
  roles: RoleEntity[];
}
