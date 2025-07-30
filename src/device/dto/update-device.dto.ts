import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';;

export class UpdateDeviceDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  ward?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  wardName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  hospital?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  hospitalName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsDate()
  lastInsert?: Date;

  @IsOptional()
  @IsNumber()
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