import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { DeleteAccountDto } from '../dto/delete-account.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * POST /users/delete — delete user by email (no password required for this task).
   */
  @Post('delete')
  async deleteAccount(@Body() dto: DeleteAccountDto) {
    const deleted = await this.usersService.deleteByEmail(dto.email);
    await this.usersService.ensureDemoUser();
    return { message: 'Account deleted', email: deleted.email };
  }
}
