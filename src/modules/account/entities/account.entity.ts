import { BasedEntity } from '@common/based.entity';
import { ProfileEntity } from '@modules/profile/entities/profile.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'account' })
export class AccountEntity extends BasedEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  refreshToken: string;

  profile: ProfileEntity;
}
