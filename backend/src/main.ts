import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //set global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //make sure only the defined parameters (email, password) from the DTO are accepted
    }),
  );
  app.enableCors();
  await app.listen(3333);
}
bootstrap();
