import { Controller, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { UserPayload } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * DELETE /users/me — delete the currently logged-in user.
   * Protected by JWT; we read user id from the token.
   */
  @Delete('me')
  @UseGuards(JwtAuthGuard)
  async deleteMe(@CurrentUser() user: UserPayload) {
    const deleted = await this.usersService.deleteById(user.userId);
    return { message: 'Account deleted', email: deleted.email };
  }
}
