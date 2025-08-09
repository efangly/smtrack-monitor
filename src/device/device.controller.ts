import { Body, Controller, Delete, Get, Logger, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { EventPattern, Ctx, Payload, RmqContext } from '@nestjs/microservices';
import { CreateDeviceDto } from './dto/create-device.dto';
import { JwtAuthGuard } from '../common/guards/jwt.guard';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}
  private readonly logger = new Logger(DeviceController.name);

  @EventPattern('create-device')
  async createDevice(@Payload() data: CreateDeviceDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      await this.deviceService.create(data);
      channel.ack(message);
    } catch (error) {
      this.logger.error(error);
      channel.nack(message, false, false);
    }
  }

  @EventPattern('update-device')
  async updateDevice(@Payload() data: { id: string, update: UpdateDeviceDto }, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    try {
      await this.deviceService.update(data.id, data.update);
      channel.ack(message);
    } catch (error) {
      this.logger.log(data.id);
      this.logger.error(error);
      channel.nack(message, false, false);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateDeviceDto) {
    return this.deviceService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.deviceService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.deviceService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: CreateDeviceDto) {
    return this.deviceService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deviceService.delete(id);
  }
}