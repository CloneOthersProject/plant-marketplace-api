import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';

import * as helmet from 'helmet';
import * as compression from 'compression';

import { AppModule } from './app.module';

const setupValidation = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
};

const setupSwagger = (app: INestApplication) => {
  const env = process.env.NODE_ENV;
  const version = process.env.API_VERSION || 'local';
  const options = new DocumentBuilder()
    .setTitle(`Plants Marketplace API ${env}`)
    .setVersion(version)
    .addTag('plant_marketplace')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);
};

const initMiddleware = (app: INestApplication) => {
  app.enableShutdownHooks();
  app.enableCors();

  app.use(helmet());
  app.use(compression());

  setupValidation(app);
  setupSwagger(app);
};

(async () => {
  const app = await NestFactory.create(AppModule);
  const log = app.get(Logger);
  const port = process.env.PORT || 5000;

  app.useLogger(log);

  initMiddleware(app);

  await app.listen(port);

  log.log(`Running server on port ${port}`);
})();
