import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { SubscribeRequest } from './app.dto';
import { AppService } from './app.service';
import { Htmx } from './htmx/htmx.decorator';
import { HtmxHeaders } from './htmx/htmx.headers';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {};
  }

  @Post('subscribe')
  async subscribe(
    @Htmx() htmx: HtmxHeaders,
    @Body() body: SubscribeRequest,
    @Res() res: Response
  ) {
    const data = await this.appService.subscribe(body);
    const template = htmx.request ? 'partials/subscription-form' : 'index';

    return res.render(template, data);
  }
}
