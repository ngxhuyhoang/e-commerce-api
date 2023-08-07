import { BasedEntity } from '@common/based.entity';
import { AccountEntity } from '@modules/account/entities/account.entity';
import { PermissionEntity } from '@modules/permission/entities/permission.entity';
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'roles' })
export class RoleEntity extends BasedEntity {
  @Column()
  @Index()
  name: string;

  @ManyToMany(() => PermissionEntity, (permissions) => permissions.roles)
  @JoinTable({ name: 'roles_and_permissions' })
  permissions: PermissionEntity[];

  @ManyToOne(() => AccountEntity, (account) => account.roles, { cascade: true })
  @JoinColumn()
  account: AccountEntity;
}
