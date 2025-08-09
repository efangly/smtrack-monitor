import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { RedisService } from '../redis/redis.service';
import { dateFormat } from '../common/utils/date.util';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService, private readonly redis: RedisService) {}
  async create(data: CreateReportDto) {
    data.createdAt = dateFormat(new Date());
    data.updatedAt = dateFormat(new Date());
    return this.prisma.reports.create({ data });
  }

  async findAll() {
    const cacheKey = 'reports';
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    const response = await this.prisma.reports.findMany({ orderBy: { createdAt: 'desc' } });
    if (response.length > 0) await this.redis.set(cacheKey, JSON.stringify(response), 60); // cache 60 seconds
    return response;
  }

  async findOne(id: string) {
    const cacheKey = `reports:${id}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);
    const response = await this.prisma.reports.findUnique({ where: { id } });
    if (response) await this.redis.set(cacheKey, JSON.stringify(response), 60); // cache 60 seconds
    return response;
  }

  async update(id: string, data: UpdateReportDto) {
    await this.redis.del(`reports:${id}`);
    return this.prisma.reports.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.redis.del(`reports:${id}`);
    return this.prisma.reports.delete({ where: { id } });
  }
}
