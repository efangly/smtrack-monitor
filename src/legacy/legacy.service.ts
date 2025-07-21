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

  async findAll() {
    return this.prisma.legacyEvents.findMany({ orderBy: { createdAt: 'desc' } });
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
