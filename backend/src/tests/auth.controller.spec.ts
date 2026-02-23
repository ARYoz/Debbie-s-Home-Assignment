import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn().mockResolvedValue({ success: true as const, email: 'user@example.com' }),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call authService.login with body email and password', async () => {
    const result = await controller.login({
      email: 'user@example.com',
      password: 'secret',
    });
    expect(mockAuthService.login).toHaveBeenCalledWith('user@example.com', 'secret');
    expect(result).toEqual({ success: true, email: 'user@example.com' });
  });
});
