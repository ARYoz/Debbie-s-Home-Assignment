import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getInfo() {
    return {
      message: 'Backend API is running',
      endpoints: {
        'POST /auth/login': 'Login (body: email, password)',
        'POST /users/delete': 'Delete account (body: email only)',
      },
    };
  }
}
