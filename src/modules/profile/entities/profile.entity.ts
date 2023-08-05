import { BasedEntity } from '@common/based.entity';
import { AccountEntity } from '@modules/account/entities/account.entity';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'profile' })
export class ProfileEntity extends BasedEntity {
  @Column({ nullable: true })
  @Index()
  firstName: string;

  @Column({ nullable: true })
  @Index()
  lastName: string;

  @Column({ nullable: true })
  @Index()
  avatarUrl: string;

  @Column({ nullable: true })
  @Index()
  dateOfBirth: Date;

  @OneToOne(() => AccountEntity, (account) => account.profile, { cascade: true })
  @JoinColumn()
  account: AccountEntity;
}
