import { BasedEntity } from '@common/based.entity';
import { AccountEntity } from '@modules/account/entities/account.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'roles' })
export class RoleEntity extends BasedEntity {
  @ManyToOne(() => AccountEntity, (account) => account.roles, { cascade: true })
  @JoinColumn()
  account: AccountEntity;
}
