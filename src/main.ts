import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('E Commerce API Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  console.log('Haha');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000, () => {
    console.info('Server is running on http://localhost:3000');
    console.info('Swagger docs http://localhost:3000/docs');
  });
}
bootstrap();
