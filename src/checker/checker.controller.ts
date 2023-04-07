import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CheckerService } from "./checker.service";
import { CreateCheckerDto } from "./dto/create-checker.dto";
import { NotifyService } from "../notify/notify.service";
import { HealthCheckService, HttpHealthIndicator } from "@nestjs/terminus";

@Controller("checker")
export class CheckerController {
  constructor(
    private readonly checkerService: CheckerService,
    private readonly notifyService: NotifyService,
    private health: HealthCheckService,
    private http: HttpHealthIndicator
  ) {
  }

  @Get('test')
  test() {
    /*this.health.check([
      () => this.http.pingCheck('한우자조금', 'https://www.hanwooboard.or.kr')
    ]).catch((error) => {
    });*/
  }

  @Get()
  findAll() {
    return this.checkerService.findAll();
  }

  @Get("/:id/start")
  startSchedule(@Param() param) {
    return this.checkerService.startSchedule(param.id);
  }

  @Get("/:id/stop")
  stopSchedule(@Param() param) {
    return this.checkerService.stopSchedule(param.id);
  }

  @Post()
  async create(@Body() checkerData: CreateCheckerDto) {
    return await this.checkerService.create(checkerData);
  }
}
