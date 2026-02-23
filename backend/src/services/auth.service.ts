import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Validate email + password. Returns success and email (no token).
   */
  async login(email: string, password: string): Promise<{ success: true; email: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const valid = await this.usersService.validatePassword(user, password);
    if (!valid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return { success: true, email: user.email };
  }
}
