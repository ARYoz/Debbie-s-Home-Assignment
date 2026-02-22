import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Use this guard on routes that require a valid JWT.
 * The JWT payload (userId, email) will be available via @CurrentUser().
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
