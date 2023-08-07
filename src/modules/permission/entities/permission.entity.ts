import { BasedEntity } from '@common/based.entity';
import { RoleEntity } from '@modules/role/entities/role.entity';
import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'permissions' })
export class PermissionEntity extends BasedEntity {
  @Column()
  @Index()
  name: string;

  @Column()
  @Index()
  description: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  @JoinTable({ name: 'roles_and_permissions' })
  roles: RoleEntity[];

  @Column()
  apiMethod: string;
}
