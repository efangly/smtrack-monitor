import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSummaryEventsDto } from './dto/create-event.dto';
import { UpdateSummaryEventsDto } from './dto/update-event.dto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService, private readonly redis: RedisService) {}

  async create(data: CreateSummaryEventsDto) {
    return this.prisma.summaryEvents.create({ data: data });
  }

  async findAll(page: string, perpage: string) {
    const cacheKey = `events:page:${page}:perpage:${perpage}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    const [ result, total ] = await this.prisma.$transaction([
      this.prisma.summaryEvents.findMany({ 
        skip: page ? (parseInt(page) - 1) * parseInt(perpage) : 0,
        take: perpage ? parseInt(perpage) : 10,
        orderBy: { createdAt: 'desc' } 
      }),
      this.prisma.summaryEvents.count()
    ]);
    const response = { result, total };
    if (response.total > 0) await this.redis.set(cacheKey, JSON.stringify(response), 60); // cache 60 seconds
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