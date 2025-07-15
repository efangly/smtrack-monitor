import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

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
}