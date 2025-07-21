import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSummaryEventsDto } from './dto/create-event.dto';
import { UpdateSummaryEventsDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSummaryEventsDto) {
    return this.prisma.summaryEvents.create({ data: data });
  }

  async findAll() {
    return this.prisma.summaryEvents.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findById(id: string) {
    return this.prisma.summaryEvents.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateSummaryEventsDto) {
    return this.prisma.summaryEvents.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.summaryEvents.delete({ where: { id } });
  }
}