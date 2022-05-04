import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Queue } from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import * as expressBasicAuth from 'express-basic-auth';

import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  const config = new DocumentBuilder()
    .setTitle('BankEL API')
    .setDescription('The BankEL API Playground')
    .setVersion('1.0')
    .addTag('transfers')
    .addTag('users')
    .addTag('login')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/bull-board');

  const aQueue = app.get<Queue>(`BullQueue_transfers-queue`);

  createBullBoard({
    queues: [new BullAdapter(aQueue)],
    serverAdapter,
  });

  app.use(
    '/bull-board',
    expressBasicAuth({
      users: {
        admin: 'admin',
      },
      challenge: true,
    }),
    serverAdapter.getRouter()
  );

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
