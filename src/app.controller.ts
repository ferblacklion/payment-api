import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  check() {
    return { status: 'running' };
  }
}
