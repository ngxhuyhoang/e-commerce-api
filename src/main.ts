import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1.0',
  });

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder().setTitle('E Commerce API Docs').setVersion('1.0').addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = configService.get('PORT');
  const env = configService.get('NODE_ENV');

  await app.listen(port, () => {
    console.info(`Environment: ${env}`);
    console.info(`Server is running on http://localhost:${port}`);
    console.info(`Swagger docs http://localhost:${port}/docs`);
  });
}
bootstrap();
