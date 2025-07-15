import { PartialType } from '@nestjs/mapped-types';
import { CreateLegacyEventsDto } from './create-legacy.dto';

export class UpdateLegacyEventsDto extends PartialType(CreateLegacyEventsDto) {}