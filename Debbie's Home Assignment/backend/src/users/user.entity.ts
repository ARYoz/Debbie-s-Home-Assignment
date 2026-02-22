import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

/**
 * User table in SQLite.
 * We use synchronize: true so TypeORM creates this table automatically.
 */
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  /** Stored hashed; never store plain passwords. */
  @Column()
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;
}
