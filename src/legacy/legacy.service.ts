import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLegacyEventsDto } from './dto/create-legacy.dto';
import { UpdateLegacyEventsDto } from './dto/update-legacy.dto';

@Injectable()
export class LegacyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateLegacyEventsDto) {
    return this.prisma.legacyEvents.create({ data: data });
  }

  async findAll(page: string, perpage: string) {
    const [ result, total ] = await this.prisma.$transaction([
      this.prisma.legacyEvents.findMany({ 
        skip: page ? (parseInt(page) - 1) * parseInt(perpage) : 0,
        take: perpage ? parseInt(perpage) : 10,
        orderBy: { createdAt: 'desc' } 
      }),
      this.prisma.legacyEvents.findMany()
    ]);
    return { result, total };
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
