import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { EventPattern, Ctx, Payload, RmqContext } from '@nestjs/microservices';
import { EventService } from './event.service';
import { CreateSummaryEventsDto } from './dto/create-event.dto';
import { UpdateSummaryEventsDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }
  private readonly logger = new Logger(EventController.name);

  @EventPattern('create-summary-event')
  async createSummaryEvent(@Payload() data: CreateSummaryEventsDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      await this.eventService.create(data);
      channel.ack(message);
    } catch (error) {
      this.logger.error(error);
      channel.nack(message, false, false);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateSummaryEventsDto) {
    return this.eventService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.eventService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.eventService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateSummaryEventsDto) {
    return this.eventService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.eventService.delete(id);
  }
}
