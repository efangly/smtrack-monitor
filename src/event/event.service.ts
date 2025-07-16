import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateSummaryEventsDto } from './dto/create-event.dto';
import { UpdateSummaryEventsDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService, private readonly redis: RedisService) {}

  async create(data: CreateSummaryEventsDto) {
    const summary = await this.prisma.summaryEvents.create({ data: data });
    await this.redis.del('summary'); // Clear cache for events
    return summary;
  }

  async findAll() {
    const cached = await this.redis.get('summary');
    if (cached) return JSON.parse(cached);
    const summaries = await this.prisma.summaryEvents.findMany({
      orderBy: { createdAt: 'desc' }
    });
    await this.redis.set('summary', JSON.stringify(summaries), 60); // Cache for 1 minute
    return summaries;
  }

  async findById(id: string) {
    const cached = await this.redis.get(`summary:${id}`);
    if (cached) return JSON.parse(cached);
    const summary = await this.prisma.summaryEvents.findUnique({ where: { id } });
    await this.redis.set(`summary:${id}`, JSON.stringify(summary), 60); // Cache for 1 minute
    return summary;
  }

  async update(id: string, data: UpdateSummaryEventsDto) {
    const updatedSummary = await this.prisma.summaryEvents.update({
      where: { id },
      data,
    });
    await this.redis.del('summary'); // Clear cache for events
    return updatedSummary;
  }

  async delete(id: string) {
    const deletedSummary = await this.prisma.summaryEvents.delete({ where: { id } });
    await this.redis.del('summary'); // Clear cache for events
    return deletedSummary;
  }
}