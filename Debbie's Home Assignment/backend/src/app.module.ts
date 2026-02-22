import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    // SQLite: one file on disk, no separate DB server. Good for local/small apps.
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/local.sqlite',
      entities: [User],
      synchronize: true, // create/update tables from entities (OK for dev; use migrations in prod)
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
