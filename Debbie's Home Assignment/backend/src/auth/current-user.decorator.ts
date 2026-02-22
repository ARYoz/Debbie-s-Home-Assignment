import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from './auth.service';

/**
 * Use in controllers: @CurrentUser() user: UserPayload
 * Returns the JWT payload (userId, email) from the request.
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
