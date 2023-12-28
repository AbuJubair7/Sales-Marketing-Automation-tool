import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
<<<<<<< HEAD

    origin: '*', // Allow requests from your Next.js app

    //methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    methods: '*',

    credentials: true, // Enable credentials (if needed)

=======
    origin: '*', // Allow requests from your Next.js app
    methods: '*',
    credentials: true, // Enable credentials (if needed)
>>>>>>> 53045a1e8b7719102cef943de676f26ebda3fc16
  });
  await app.listen(8000);
}
bootstrap();
