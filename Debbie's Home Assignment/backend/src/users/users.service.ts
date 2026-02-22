import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /** Find user by email (for login). */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  /** Find user by id (for delete and auth). */
  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  /**
   * Create a new user with hashed password.
   * Used here only for seeding a test user; the app only has login + delete.
   */
  async create(email: string, plainPassword: string): Promise<User> {
    const passwordHash = await bcrypt.hash(plainPassword, 10);
    const user = this.userRepository.create({ email, passwordHash });
    return this.userRepository.save(user);
  }

  /** Check password against stored hash. */
  async validatePassword(user: User, plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, user.passwordHash);
  }

  /** Delete user by id. Returns the deleted user or throws if not found. */
  async deleteById(id: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
    return user;
  }
}
