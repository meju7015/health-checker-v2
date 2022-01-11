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

  @Cron('*/10 * * * * *')
  @HealthCheck()
  async handleCron() {
    const checkers = await this.checkerService.findAll();

    checkers.map(async (checker) => {
      await this.health
        .check([() => this.http.pingCheck(checker.name, checker.url)])
        .catch((error) => {
          this.logger.debug(error);
          console.log(error.status);
          this.notifyService.notify({
            attachments: [
              {
                color: 'danger',
                pretext: '<!channel> *웹/데이터베이스 헬스 체커 v4.0*',
                text:
                  checker.name +
                  '서버 상태가 변경 되었습니다.' +
                  '\n*HOST* : ' +
                  checker.url +
                  '\t\t*현재상태* : ' +
                  error.status +
                  '\n*허용상태* : ' +
                  checker.allowStatus,
                actions: [
                  {
                    type: 'button',
                    name: 'stop',
                    text: '알람끄기',
                    style: 'danger',
                    url: `${process.env.URL}/checker/${checker.id}/stop`,
                  },
                  {
                    type: 'button',
                    name: 'start',
                    text: '알람켜기',
                    style: 'primary',
                    url: `${process.env.URL}/checker/${checker.id}/start`,
                  },
                ],
              },
            ],
          });
        });
    });
  }
}
