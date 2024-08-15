import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from 'task-project-razdva1994';
import { ValidationPipe } from 'task-project-razdva1994';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app1 = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`${process.env.RABBIT_SERVICE_DOCKER}`],
        queue: 'task_service_queue',
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  await app1.listen();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setViewEngine('hbs');

  app.enableCors();
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Go internship')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addTag('Razdva project')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/task-docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
