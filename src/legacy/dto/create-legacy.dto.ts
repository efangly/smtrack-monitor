import { EventType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateLegacyEventsDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  deviceId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  probe: string;

  @IsNotEmpty()
  @IsString()
  event: string;
  
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsOptional()
  @IsEnum(EventType)
  tag?: EventType
}