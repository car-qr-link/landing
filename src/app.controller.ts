import { Body, Controller, Get, Post, Render, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { SubscribeRequest, UnsubscribeRequest } from './app.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return { context: {} };
  }

  @Post('subscribe')
  @UseGuards(ThrottlerGuard)
  @Render('index')
  async subscribe(@Body() body: SubscribeRequest) {
    const data = await this.appService.subscribe(body);

    return data;
  }

  @Get('unsubscribe')
  @Render('unsubscribe')
  async unsubscribe() {
    return { context: {} };
  }

  @Post('unsubscribe')
  @Render('unsubscribe')
  async unsubscribePost(@Body() body: UnsubscribeRequest) {
    const data = await this.appService.unsubscribe(body);

    return data;
  }
}
