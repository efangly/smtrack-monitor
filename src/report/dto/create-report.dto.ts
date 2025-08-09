import { ReportType } from "@prisma/client";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  report: string;

  @IsEnum(ReportType)
  type: ReportType;

  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  updatedAt?: Date;
}
