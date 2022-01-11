import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CheckerService } from './checker.service';
import { CreateCheckerDto } from './dto/create-checker.dto';

@Controller('checker')
export class CheckerController {
  constructor(private readonly checkerService: CheckerService) {}

  @Get()
  findAll() {
    return this.checkerService.findAll();
  }

  @Get('/:id/start')
  startSchedule(@Param() param) {
    return this.checkerService.startSchedule(param.id);
  }

  @Get('/:id/stop')
  stopSchedule(@Param() param) {
    return this.checkerService.stopSchedule(param.id);
  }

  @Post()
  async create(@Body() checkerData: CreateCheckerDto) {
    return await this.checkerService.create(checkerData);
  }
}
