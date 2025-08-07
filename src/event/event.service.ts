import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSummaryEventsDto } from './dto/create-event.dto';
import { UpdateSummaryEventsDto } from './dto/update-event.dto';
import { RedisService } from '../redis/redis.service';
import { dateFormat } from '../common/utils/date.util';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService, private readonly redis: RedisService) { }

  async create(data: CreateSummaryEventsDto) {
    data.createdAt = dateFormat(new Date());
    data.updatedAt = dateFormat(new Date());
    return this.prisma.summaryEvents.create({ data: data });
  }

  async findAll() {
    const cacheKey = 'events';
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    const response = await this.prisma.summaryEvents.findMany({ orderBy: { createdAt: 'desc' } });
    if (response.length > 0) await this.redis.set(cacheKey, JSON.stringify(response), 60); // cache 60 seconds
    return response;
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