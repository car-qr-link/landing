import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { SubscribeRequest, UnsubscribeRequest } from './app.dto';
import { AppService } from './app.service';
import { Htmx } from './htmx/htmx.decorator';
import { HtmxHeaders } from './htmx/htmx.headers';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {};
  }

  @Post('subscribe')
  async subscribe(
    @Htmx() htmx: HtmxHeaders,
    @Body() body: SubscribeRequest,
    @Res() res: Response,
  ) {
    const data = await this.appService.subscribe(body);
    const template = htmx.request ? 'partials/forms/subscription' : 'index';

    return res.render(template, data);
  }

  @Get('unsubscribe')
  @Render('unsubscribe')
  async unsubscribe() {}

  @Post('unsubscribe')
  async unsubscribePost(
    @Htmx() htmx: HtmxHeaders,
    @Body() body: UnsubscribeRequest,
    @Res() res: Response,
  ) {
    const data = await this.appService.unsubscribe(body);
    const template = htmx.request
      ? 'partials/forms/unsubscribe'
      : 'unsubscribe';

    return res.render(template, data);
  }
}
