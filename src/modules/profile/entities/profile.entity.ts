import { BasedEntity } from '@common/based.entity';
import { AccountEntity } from '@modules/account/entities/account.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'profile' })
export class ProfileEntity extends BasedEntity {
  @Column({ nullable: true, default: '' })
  firstName: string;

  @Column({ nullable: true, default: '' })
  lastName: string;

  @Column({ nullable: true, default: '' })
  avatarUrl: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @OneToOne(() => AccountEntity, (account) => account.profile, { cascade: true })
  @JoinColumn()
  account: AccountEntity;
}
