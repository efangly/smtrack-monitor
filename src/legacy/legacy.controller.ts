import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EventPattern, Ctx, Payload, RmqContext } from '@nestjs/microservices';
import { CreateLegacyEventsDto } from './dto/create-legacy.dto';
import { LegacyService } from './legacy.service';
import { UpdateLegacyEventsDto } from './dto/update-legacy.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';

@Controller('legacy')
export class LegacyController {
  constructor(private readonly legacyService: LegacyService) { }
  private readonly logger = new Logger(LegacyController.name);

  @EventPattern('create-event')
  async createEvent(@Payload() data: CreateLegacyEventsDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      await this.legacyService.create(data);
      channel.ack(message);
    } catch (error) {
      this.logger.error(error);
      channel.nack(message, false, false);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateLegacyEventsDto) {
    return this.legacyService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query('page') page: string, @Query('perpage') perpage: string) {
    return this.legacyService.findAll(page, perpage);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.legacyService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateLegacyEventsDto) {
    return this.legacyService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.legacyService.delete(id);
  }
}
