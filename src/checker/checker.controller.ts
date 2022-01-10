import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller('checker')
export class CheckerController {
  @Get()
  getChecker() {
    return 'checkers';
  }
}
