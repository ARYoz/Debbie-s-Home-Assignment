import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockUser: User = {
    id: 'user-1',
    email: 'test@example.com',
    passwordHash: 'hashed',
    createdAt: new Date(),
  };

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByEmail', () => {
    it('should return user when found', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      const result = await service.findByEmail('test@example.com');
      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should return null when not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      const result = await service.findByEmail('nope@example.com');
      expect(result).toBeNull();
    });
  });

  describe('deleteById', () => {
    it('should remove user and return it when found', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      mockRepository.remove.mockResolvedValue(mockUser);

      const result = await service.deleteById('user-1');

      expect(result).toEqual(mockUser);
      expect(mockRepository.remove).toHaveBeenCalledWith(mockUser);
    });

    it('should throw NotFoundException when user does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteById('non-existent')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockRepository.remove).not.toHaveBeenCalled();
    });
  });

  describe('deleteByEmail', () => {
    it('should remove user when found', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      mockRepository.remove.mockResolvedValue(mockUser);

      const result = await service.deleteByEmail('test@example.com');

      expect(result).toEqual(mockUser);
      expect(mockRepository.remove).toHaveBeenCalledWith(mockUser);
    });

    it('should throw NotFoundException when user not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.deleteByEmail('unknown@example.com')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockRepository.remove).not.toHaveBeenCalled();
    });
  });
});
