import { BasedEntity } from '@common/based.entity';
import { Entity } from 'typeorm';

@Entity({ name: 'account' })
export class AccountEntity extends BasedEntity {}
