import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { TransformInterceptor } from '@interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1.0',
  });

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Web API Thương Mại Điện Tử Docs')
    .setDescription('Project về thương mại điện tử')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    explorer: true,
    // swaggerOptions: {
    //   urls: [
    //     {
    //       url: 'http://localhost:4200/swagger-ui.html',
    //       name: 'v1',
    //     },
    //     {
    //       url: 'http://localhost:4200/api/docs',
    //       name: 'v2',
    //     },
    //   ],
    // },
  });

  const port = configService.get('PORT');
  const env = configService.get('NODE_ENV');

  await app.listen(port, () => {
    console.info(`Environment: ${env}`);
    console.info(`Server is running on http://localhost:${port}`);
    console.info(`Swagger docs http://localhost:${port}/docs`);
  });
}

bootstrap();
