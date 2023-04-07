import { Injectable } from "@nestjs/common";
import { IncomingWebhook } from "@slack/client";
import { InjectSlack } from "nestjs-slack-webhook";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { Checker } from "../checker/entities/checker.entity";

interface INotifyMessage {
  checker: Checker;
  response: AxiosResponse;
}

@Injectable()
export class NotifyService {
  constructor(
    @InjectSlack()
    private readonly slack: IncomingWebhook,
    private readonly httpService: HttpService,
  ) {}

  async notify(message: INotifyMessage) {
    const { checker, response } = message;
    const startUrl = process.env.URL + '/checker/' + checker.id + '/start';
    const stopUrl = process.env.URL + '/checker/' + checker.id + '/stop';

    return await this.httpService.axiosRef({
      url: process.env.WEBEX_WEBHOOK_URL,
      method: 'POST',
      data: {
        markdown: '### 🔴 서버상태이상알림 \n'
          + '**사이트** : 한우자조금\n'
          + '**상태** : ' + response.status + '\n'
          + '**허용상태** : ' + checker.allowStatus + '\n'
          + '**URL** : ' + checker.url + '\n'
          + '<a href="' + stopUrl + '">알람끄기</a> '
          + '<a href="' + startUrl + '">알람켜기</a>'
      }
    });
  }
}
