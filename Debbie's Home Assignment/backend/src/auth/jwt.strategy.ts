import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService, UserPayload } from './auth.service';

/** Options for JWT verification; must match what we use in JwtModule. */
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: process.env.JWT_SECRET ?? 'dev-secret-change-in-production',
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super(jwtOptions);
  }

  /**
   * Passport calls this with the decoded JWT payload.
   * Return value is attached to request.user in guarded routes.
   */
  validate(payload: UserPayload): UserPayload {
    if (!payload.userId || !payload.email) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
