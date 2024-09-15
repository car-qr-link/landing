import { NotificationChannel, SendMessage } from '@car-qr-link/apis';
import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class NotificationsService implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(NotificationsService.name);

    private readonly client: RedisClientType;
    private readonly sendQueue: string;

    constructor() {
        this.client = createClient({
            url: process.env.BROKER_URL || 'redis://localhost:6379/0',
        });
        this.client.on('error', (err) => {
            this.logger.error(err);
        });

        this.sendQueue = process.env.SEND_QUEUE || 'messages:send:email';
    }

    async send(address: string, body: string): Promise<void> {
        const msg: SendMessage = {
            channel: NotificationChannel.Email,
            message: body,
            to: address,
        };

        await this.client.rPush(this.sendQueue, JSON.stringify(msg));
    }

    async onModuleInit(): Promise<void> {
        await this.client.connect();
    }

    async onModuleDestroy(): Promise<void> {
        this.client.quit();
    }
}
