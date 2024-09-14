import { Injectable } from '@nestjs/common';
import { SubscribeRequest, SubscribeRequestSchema } from './app.dto';
import { SubscriptionsService } from './core/subscriptions/subscriptions.service';
import { ZodError, ZodNativeEnum } from 'zod';

@Injectable()
export class AppService {
  constructor(
    private readonly subscriptions: SubscriptionsService
  ) { }

  async subscribe(src: SubscribeRequest) {
    const context: { success: boolean, error: any, email: string } = {
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
        context.error = 'Некорректный адрес электронной почты. Попробуйте ещё раз.';
      } else if (error instanceof Error && 'errno' in error && error.errno === 1062) {
        context.error = 'Вы уже подписаны!';
      } else {
        context.error = 'Что-то пошло не так! Напишите нам: <a href="mailto:admin@carqr.link?subject=Ошибка на сайте">admin@carqr.link</a>';
      }
    }

    return { context };
  }
}
