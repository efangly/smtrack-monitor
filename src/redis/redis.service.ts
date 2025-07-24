import { Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';
import { createClient } from 'redis';
import type { RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;
  private readonly logger = new Logger(RedisService.name);

  async set(key: string, value: string, expire: number): Promise<void> {
    try {
      await this.client.setEx(key, expire, value);
    } catch (error) {
      this.logger.error(`Redis set error: ${error}`);
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      this.logger.error(`Redis get error: ${error}`);
      return null; 
    }
  }

  async del(key: string): Promise<void> {
    const dataSet = await this.client.keys(`${key}*`);
    if (dataSet.length > 0) await this.client.del(dataSet);
  }

  async onModuleInit() {
    this.client = createClient({ 
      url: process.env.REDIS_URL, 
      password: process.env.REDIS_PASSWORD,
      socket: {
        reconnectStrategy: 5000
      }
    });
    try {
      await this.client.connect();
      await this.client.flushAll();
    } catch (error) {
      this.logger.error(`Redis connection error: ${error}`);  
    }
    this.client.on('error', (error) => {
      this.logger.error(`Redis error: ${error}`);
    });
    this.client.on('reconnecting', () => {
      this.logger.log('Redis reconnecting..');
    });
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}