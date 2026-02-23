import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';
import { UsersService } from './services/users.service';

async function bootstrap() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true, // so request body is turned into DTO class instance
    }),
  );

  app.enableCors();

  app.use((req: { method: string; url: string }, _res: unknown, next: () => void) => {
    const label =
      req.method === 'POST' && req.url === '/auth/login'
        ? ' ← LOGIN'
        :       req.method === 'POST' && req.url === '/users/delete'
          ? ' ← DELETE ACCOUNT'
          : '';
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}${label}`);
    next();
  });

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  console.log(`Backend running at http://localhost:${port}`);

  const usersService = app.get(UsersService);
  if (await usersService.ensureDemoUser()) {
    console.log('Seeded demo user: demo@example.com / demo123');
  }
}

bootstrap();
