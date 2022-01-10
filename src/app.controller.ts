import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  index() {
    return 'Health Checker 3.0';
  }
}
