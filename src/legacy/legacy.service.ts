import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateLegacyEventsDto } from './dto/create-legacy.dto';
import { UpdateLegacyEventsDto } from './dto/update-legacy.dto';

@Injectable()
export class LegacyService {
  constructor(private readonly prisma: PrismaService, private readonly redis: RedisService) {}

  async create(data: CreateLegacyEventsDto) {
    const event = await this.prisma.legacyEvents.create({ data: data });
    await this.redis.del('event'); // Clear cache for events
    return event;
  }

  async findAll() {
    const cached = await this.redis.get('event');
    if (cached) return JSON.parse(cached);
    const event = await this.prisma.legacyEvents.findMany({ orderBy: { createdAt: 'desc' } });
    await this.redis.set('event', JSON.stringify(event), 60); // Cache for 1 minute
    return event;
  }

  async findById(id: string) {
    const cached = await this.redis.get(`event:${id}`);
    if (cached) return JSON.parse(cached);
    const event = await this.prisma.legacyEvents.findUnique({ where: { id } });
    await this.redis.set(`event:${id}`, JSON.stringify(event), 60); // Cache for 1 minute
    return event;
  }

  async update(id: string, data: UpdateLegacyEventsDto) {
    const event = await this.prisma.legacyEvents.update({
      where: { id },
      data: data,
    });
    await this.redis.del('event');
    return event;
  }

  async delete(id: string) {
    const event = await this.prisma.legacyEvents.delete({ where: { id } });
    await this.redis.del('event');
    return event;
  }
}
