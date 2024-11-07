import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScrapingService } from '../services/scraping.service';
import { ScrapingController } from '../controllers/scraping.controller';
import { ScrapingResult, ScrapingResultSchema } from '../schemas/scraping-result.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ScrapingResult.name, schema: ScrapingResultSchema }]),
  ],
  providers: [ScrapingService],
  controllers: [ScrapingController],
})
export class ScrapingModule {}
