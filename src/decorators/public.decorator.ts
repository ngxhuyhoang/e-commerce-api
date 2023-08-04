import { MetadataKey } from '@constants/enum';
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata(MetadataKey.IS_PUBLIC, true);
