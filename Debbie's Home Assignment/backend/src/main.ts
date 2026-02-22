import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';

async function bootstrap() {
  // Ensure SQLite database directory exists
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const app = await NestFactory.create(AppModule);

  // Validate request bodies (e.g. login payload) using class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown properties
      forbidNonWhitelisted: false,
    }),
  );

  // Allow frontend (Expo web/mobile) to call this API
  app.enableCors();

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Backend running at http://localhost:${port}`);

  // Seed one demo user if DB is empty (so we can test login without a signup flow)
  const usersService = app.get(UsersService);
  const existing = await usersService.findByEmail('demo@example.com');
  if (!existing) {
    await usersService.create('demo@example.com', 'demo123');
    console.log('Seeded demo user: demo@example.com / demo123');
  }
}

bootstrap();
