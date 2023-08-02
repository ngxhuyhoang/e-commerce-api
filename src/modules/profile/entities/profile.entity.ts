import { BasedEntity } from '@common/based.entity';
import { AccountEntity } from '@modules/account/entities/account.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'profile' })
export class ProfileEntity extends BasedEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @OneToOne(() => AccountEntity, (account) => account.profile, { cascade: true })
  @JoinColumn()
  account: AccountEntity;
}
