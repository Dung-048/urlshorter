/* eslint-disable unicorn/prefer-top-level-await */
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';
import { configLogging } from './configuration/config-logging';
import { configureSwagger } from './configuration/config-swagger';
import { ApiConfigService } from './shared/services/api-config.service';
import { SharedModule } from './shared/shared.module';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  const configService = app.select(SharedModule).get(ApiConfigService);

  configureSwagger(app, configService);
  configLogging(app, configService);

  await app.listen(configService.serverPort);

  console.info(`server running on ${await app.getUrl()}`);

  return app;
}

void bootstrap();
