import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptions: Repository<Subscription>,
  ) {}

  async subscribe(email: string): Promise<Subscription> {
    const subscription = this.subscriptions.create({ email });

    return this.subscriptions.save(subscription);
  }

  async unsubscribe(email: string): Promise<void> {
    await this.subscriptions.delete({ email });
  }
}
