import { BasedEntity } from '@common/based.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'permissions' })
export class Permission extends BasedEntity {
  @Column()
  @Index()
  name: string;

  @Column()
  @Index()
  description: string;
}
