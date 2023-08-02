import { BasedEntity } from '@common/based.entity';
import { AccountEntity } from '@modules/account/entities/account.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity({ name: 'profile' })
export class ProfileEntity extends BasedEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  avatarUrl: string;

  @Column()
  dateOfBirth: Date;

  @OneToOne(() => AccountEntity, (account) => account.profile)
  account: ProfileEntity;
}
