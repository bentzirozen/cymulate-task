import { Controller, Post, Get, Body } from '@nestjs/common';
import { ScrapingService } from '../services/scraping.service';
import { CreateScrapingDto } from '../dto/create-scraping.dto';
import { ScrapingResult } from '../schemas/scraping-result.schema';

@Controller('scraping')
export class ScrapingController {
  constructor(private readonly scrapingService: ScrapingService) {}

  @Post()
  async scrape(@Body() createScrapingDto: CreateScrapingDto): Promise<ScrapingResult> {
    return this.scrapingService.scrapeWebsite(createScrapingDto.url);
  }

  @Get()
  async getAllResults(): Promise<ScrapingResult[]> {
    return this.scrapingService.getAllScrapingResults();
  }
}
