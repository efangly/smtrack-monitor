import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDeviceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  ward: string;

  @IsString()
  @MaxLength(100)
  wardName?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  hospital: string;

  @IsString()
  @MaxLength(100)
  hospitalName?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  sn: string;

  @IsNotEmpty()
  @IsNumber()
  seq: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsDate()
  @IsOptional()
  lastInsert?: Date;

  @IsNumber()
  @IsOptional()
  lastTemp?: number;

  @IsDate()
  @IsOptional()
  lastNotification?: Date;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  lastEvent?: string;

  @IsBoolean()
  @IsOptional()
  door?: boolean;

  @IsBoolean()
  @IsOptional()
  plug?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  ip?: string;
}