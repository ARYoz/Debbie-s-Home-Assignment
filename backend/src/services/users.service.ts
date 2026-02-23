import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../models/user.entity';

@Injectable()
export class UsersService {
  private readonly userRepository: Repository<User>;

  constructor(
    @InjectRepository(User) userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(email: string, plainPassword: string): Promise<User> {
    const passwordHash = await bcrypt.hash(plainPassword, 10);
    const user = this.userRepository.create({ email, passwordHash });
    return this.userRepository.save(user);
  }

  async validatePassword(user: User, plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, user.passwordHash);
  }

  async deleteById(id: string): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
    return user;
  }

  /** Delete user by email (no password). */
  async deleteByEmail(email: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
    return user;
  }

  async ensureDemoUser(): Promise<boolean> {
    const existing = await this.findByEmail('demo@example.com');
    if (!existing) {
      await this.create('demo@example.com', 'demo123');
      return true;
    }
    return false;
  }
}
