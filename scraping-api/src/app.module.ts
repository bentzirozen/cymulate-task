import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScrapingModule } from './scraping/modules/scraping.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/web-scraper-db'), // Adjust as needed
    ScrapingModule,
    AuthModule
  ],
})
export class AppModule {}
