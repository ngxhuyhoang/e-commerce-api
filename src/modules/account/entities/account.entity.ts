import { BasedEntity } from '@common/based.entity';
import { ProfileEntity } from '@modules/profile/entities/profile.entity';
import { Column, Entity, Index } from 'typeorm';

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

  profile: ProfileEntity;
}
