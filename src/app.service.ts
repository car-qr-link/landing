import { Injectable, Logger } from '@nestjs/common';
import { ZodError } from 'zod';
import {
  SubscribeRequest,
  SubscribeRequestSchema,
  UnsubscribeRequest,
  UnsubscribeRequestSchema,
} from './app.dto';
import { SubscriptionsService } from './core/subscriptions/subscriptions.service';
import { NotificationsService } from './notifications/notifications.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    private readonly subscriptions: SubscriptionsService,
    private readonly notifications: NotificationsService,
  ) { }

  async subscribe(src: SubscribeRequest) {
    const context: { success: boolean; error: any; email: string } = {
      success: true,
      error: null,
      email: src.email,
    };

    try {
      const payload = SubscribeRequestSchema.parse(src);

      await this.subscriptions.subscribe(payload.email);
    } catch (error) {
      context.success = false;
      if (error instanceof ZodError) {
        context.error =
          'Некорректный адрес электронной почты. Попробуйте ещё раз.';
      } else if (
        error instanceof Error &&
        'errno' in error &&
        error.errno === 1062
      ) {
        context.error = 'Вы уже подписаны!';
      } else {
        context.error =
          'Что-то пошло не так! Напишите нам: <a href="mailto:admin@carqr.link?subject=Ошибка на сайте">admin@carqr.link</a>';
        this.logger.error(error);
      }
    }

    try {
      await this.notifications.send(
        context.email,
        "<p>Спасибо за подписку на новости проекта.</p><p>Если это были не Вы, то отменить подписку можно по ссылке: https://carqr.link/unsubscribe</p>"
      );
    } catch (error) {
      this.logger.error(error);
    }

    return { context };
  }

  async unsubscribe(src: UnsubscribeRequest) {
    const context: { success: boolean; error: any; email: string } = {
      success: true,
      error: null,
      email: src.email,
    };

    try {
      const payload = UnsubscribeRequestSchema.parse(src);
      await this.subscriptions.unsubscribe(payload.email);
    } catch (error) {
      context.success = false;
      if (error instanceof ZodError) {
        context.error =
          'Некорректный адрес электронной почты. Попробуйте ещё раз.';
      } else {
        context.error =
          'Что-то пошло не так! Напишите нам: <a href="mailto:admin@carqr.link?subject=Ошибка на сайте">admin@carqr.link</a>';
        this.logger.error(error);
      }
    }

    return { context };
  }
}
