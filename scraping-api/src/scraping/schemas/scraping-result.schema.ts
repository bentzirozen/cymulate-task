import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ScrapingResult extends Document {
  @Prop({ required: true })
  url: string;

  @Prop({ type: [String] })
  domains: string[];

  @Prop({ type: [String] })
  urls: string[];

  @Prop({ default: Date.now })
  scrapedAt: Date;
}

export const ScrapingResultSchema = SchemaFactory.createForClass(ScrapingResult);
