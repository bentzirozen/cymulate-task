import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',  // Allow only requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  });
  await app.listen(process.env.PORT_APP ?? 3001);
   // Enable CORS for all origins
   
}
bootstrap();
