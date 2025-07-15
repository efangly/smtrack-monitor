import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  event: string;

  @IsNotEmpty()
  @IsString()
  tag: string;
}