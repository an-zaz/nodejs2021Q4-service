import { SetMetadata } from '@nestjs/common';

export const SkipJwt = () => SetMetadata('skip-jwt', true);

