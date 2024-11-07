import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScrapingResult } from '../schemas/scraping-result.schema';
import { URL } from 'url';

@Injectable()
export class ScrapingService {
  constructor(
    @InjectModel(ScrapingResult.name) private scrapingResultModel: Model<ScrapingResult>,
  ) {}

  async scrapeWebsite(url: string): Promise<ScrapingResult> {
    try {
      // Fetch the HTML content of the page
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      // Extract all URLs and domains
      const urls: string[] = [];
      const domains: Set<string> = new Set();

      $('a').each((_, element) => {
        const href = $(element).attr('href');
        if (href) {
          try {
            const parsedUrl = new URL(href, url); // handle relative URLs
      
            // Check if the URL or domain is not empty
            if (parsedUrl.href && parsedUrl.hostname) {
              urls.push(parsedUrl.href);
              domains.add(parsedUrl.hostname);
            }
          } catch (error) {
            console.error('Invalid URL:', href);
          }
        }
      });
      

      // Prepare the result document
      const scrapingResult = new this.scrapingResultModel({
        url,
        urls,
        domains: Array.from(domains),
      });

      // Save to MongoDB
      return await scrapingResult.save();
    } catch (error) {
      throw new HttpException(
        'Failed to scrape website',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllScrapingResults(): Promise<ScrapingResult[]> {
    return this.scrapingResultModel.find().sort({ scrapedAt: -1 }).exec();
  }
}
