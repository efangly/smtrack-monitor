import { PartialType } from '@nestjs/mapped-types';
import { CreateSummaryEventsDto } from './create-event.dto';

export class UpdateSummaryEventsDto extends PartialType(CreateSummaryEventsDto) {}