import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { HtmxHeaders } from './htmx.headers';

export const Htmx = createParamDecorator((data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  return new HtmxHeaders(request);
});
