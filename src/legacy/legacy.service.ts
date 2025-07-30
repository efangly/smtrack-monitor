import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLegacyEventsDto } from './dto/create-legacy.dto';
import { UpdateLegacyEventsDto } from './dto/update-legacy.dto';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class LegacyService {
  constructor(private readonly prisma: PrismaService, private readonly redis: RedisService) { }

  async create(data: CreateLegacyEventsDto) {
    return this.prisma.legacyEvents.create({ data: data });
  }

  async findAll() {
    const cacheKey = 'legacy-events';
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    const response = await this.prisma.legacyEvents.findMany({
      include: { device: { select: { wardName: true, hospitalName: true } } },
      orderBy: { createdAt: 'desc' }
    });
    if (response.length > 0) await this.redis.set(cacheKey, JSON.stringify(response), 60); // cache 60 seconds
    return response;
  }

  async findById(id: string) {
    return this.prisma.legacyEvents.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateLegacyEventsDto) {
    return this.prisma.legacyEvents.update({ where: { id }, data: data });
  }

  async delete(id: string) {
    return this.prisma.legacyEvents.delete({ where: { id } });
  }
}
