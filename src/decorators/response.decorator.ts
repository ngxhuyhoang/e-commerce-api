import { MetadataKey } from '@constants/enum';
import { SetMetadata } from '@nestjs/common';

export const ResponseMessage = (message: string) => SetMetadata(MetadataKey.RESPONSE_MESSAGE, message);
