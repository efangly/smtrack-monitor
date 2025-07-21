import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateDeviceDto) {
    return this.prisma.legacyDevices.create({ data: data });
  }

  async findAll(page: string, perpage: string) {
    const [ result, total ] = await this.prisma.$transaction([
      this.prisma.legacyDevices.findMany({
        skip: page ? (parseInt(page) - 1) * parseInt(perpage) : 0,
        take: perpage ? parseInt(perpage) : 10,
        include: { events: { orderBy: { createdAt: 'desc' } } },
        orderBy: { seq: 'asc' }
      }),
      this.prisma.legacyDevices.findMany(),
    ])
    return { result, total };
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
