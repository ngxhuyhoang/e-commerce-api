import { MetadataKey } from '@constants/enum';
import { SetMetadata } from '@nestjs/common';

export const Roles = (roles: string) => SetMetadata(MetadataKey.ROLES, roles);
