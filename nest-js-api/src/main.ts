import {  NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
config();


const PORT = process.env.PORT || 7000;

async function bootstrap() {
  let app: INestApplication | NestFastifyApplication;
  process.env.USE_FASTIFY ?  app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  ) : app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, '0.0.0.0');
}
bootstrap();
