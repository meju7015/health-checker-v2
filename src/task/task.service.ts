import { Injectable, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { Cron } from '@nestjs/schedule';
import { CheckerService } from '../checker/checker.service';
import { NotifyService } from '../notify/notify.service';

@Injectable()
export class TaskService {
  private readonly logger: Logger = new Logger(TaskService.name);

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private checkerService: CheckerService,
    private notifyService: NotifyService,
  ) {}

  @Cron('0 * * * * *')
  @HealthCheck()
  async handleCron() {
    const checkers = await this.checkerService.findAll();

    checkers.map(async (checker) => {
      console.log('Running :: ', checker.id);

      await this.health
        .check([() => this.http.pingCheck(checker.name, checker.url)])
        .catch((error) => {
          this.logger.debug('check Error :: ', error.response);

          this.notifyService.notify({
            checker,
            response: {
              statusText: 500,
              ...error.response
            },
          });
        });
    });
  }
}
