import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { LegacyModule } from './legacy/legacy.module';
import { ConfigModule } from '@nestjs/config';
import { DeviceModule } from './device/device.module';
import { EventModule } from './event/event.module';
import { JwtStrategy } from './common/strategies';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    PrismaModule, 
    HealthModule, 
    LegacyModule, 
    DeviceModule, 
    EventModule
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
