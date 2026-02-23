import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.entity';

describe('AuthService', () => {
  let service: AuthService;

  const mockUser: User = {
    id: 'user-1',
    email: 'test@example.com',
    passwordHash: 'hashed',
    createdAt: new Date(),
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
    validatePassword: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return success and email when email and password are valid', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      mockUsersService.validatePassword.mockResolvedValue(true);

      const result = await service.login('test@example.com', 'password123');

      expect(result).toEqual({ success: true, email: 'test@example.com' });
    });

    it('should throw UnauthorizedException when user not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(service.login('unknown@example.com', 'pass')).rejects.toThrow(
        UnauthorizedException,
      );
      expect(mockUsersService.validatePassword).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when password is wrong', async () => {
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      mockUsersService.validatePassword.mockResolvedValue(false);

      await expect(
        service.login('test@example.com', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
