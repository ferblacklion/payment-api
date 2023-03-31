import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/v1/api');
  await app.listen(port, () => {
    console.log(`running on ${port}`);
  });
}
bootstrap();
