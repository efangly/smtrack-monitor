import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService, private readonly redis: RedisService) {}

  async create(data: CreateDeviceDto) {
    const device = await this.prisma.legacyDevices.create({ data: data });
    await this.redis.del('device');
    return device;
  }

  async findAll() {
    const cached = await this.redis.get('device');
    if (cached) return JSON.parse(cached);
    const devices = await this.prisma.legacyDevices.findMany();
    await this.redis.set('device', JSON.stringify(devices), 60); // Cache for 1 minute
    return devices;
  }

  async findById(id: string) {
    const cached = await this.redis.get(`device:${id}`);
    if (cached) return JSON.parse(cached);
    const device = await this.prisma.legacyDevices.findUnique({ 
      where: { id },
      include: { events: true }
    });
    await this.redis.set(`device:${id}`, JSON.stringify(device), 60); // Cache for 1 minute
    return device;
  }

  async update(id: string, data: CreateDeviceDto) {
    const updatedDevice = await this.prisma.legacyDevices.update({
      where: { id },
      data: data,
    });
    await this.redis.del('device');
    return updatedDevice;
  }

  async delete(id: string) {
    const deletedDevice = await this.prisma.legacyDevices.delete({ where: { id } });
    await this.redis.del('device');
    await this.redis.del(`device:${id}`);
    return deletedDevice;
  }
}
