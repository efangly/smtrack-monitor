import { EventType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSummaryEventsDto {
  @IsOptional()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  log: number;

  @IsNotEmpty()
  @IsNumber()
  notification: number;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsOptional()
  @IsEnum(EventType)
  tag?: EventType
}