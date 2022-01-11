import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Cron('2/1 * * * * *')
  @HealthCheck()
  async handleCron() {
    /*const checkers = this.checkerService.findAll();

    console.log(checkers);*/

    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://asd.com'),
    ]);
  }
}
