import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService, private readonly redis: RedisService) {}

  async create(data: CreateDeviceDto) {
    return this.prisma.legacyDevices.create({ data: data });
  }

  async findAll(page: string, perpage: string) {
    const cacheKey = `devices:page:${page}:perpage:${perpage}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    const [result, total] = await this.prisma.$transaction([
      this.prisma.legacyDevices.findMany({
      skip: page ? (parseInt(page) - 1) * parseInt(perpage) : 0,
      take: perpage ? parseInt(perpage) : 10,
      include: { events: { orderBy: { createdAt: 'desc' } } },
      orderBy: { seq: 'asc' }
      }),
      this.prisma.legacyDevices.count(),
    ]);
    const response = { result, total };
    if (response.total > 0)  await this.redis.set(cacheKey, JSON.stringify(response), 60); // cache 60 seconds
    return response;
  }

  async findById(id: string) {
    return this.prisma.legacyDevices.findUnique({ 
      where: { id },
      include: { events: { orderBy: { createdAt: 'desc' } } },
    });
  }

  async update(id: string, data: CreateDeviceDto) {
    const updatedDevice = await this.prisma.legacyDevices.update({
      where: { id },
      data: data,
    });
    return updatedDevice;
  }

  async delete(id: string) {
    await this.prisma.legacyDevices.delete({ where: { id } });
    return 'Deleted';
  }
}
