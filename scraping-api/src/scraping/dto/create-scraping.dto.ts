import { IsUrl } from 'class-validator';

export class CreateScrapingDto {
  @IsUrl({}, { message: 'Invalid URL format' })
  url: string;
}
