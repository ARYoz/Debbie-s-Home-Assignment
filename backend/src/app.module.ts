import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './controllers/app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users.module';
import { User } from './models/user.entity';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'data/local.sqlite',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
