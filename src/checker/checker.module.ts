import { Module } from '@nestjs/common';
import { CheckerController } from './checker.controller';
import { CheckerService } from './checker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checker } from './entities/checker.entity';
import { NotifyModule } from "../notify/notify.module";
import { TerminusModule } from "@nestjs/terminus";

@Module({
  imports: [TypeOrmModule.forFeature([Checker]), NotifyModule, TerminusModule],
  controllers: [CheckerController],
  providers: [CheckerService],
  exports: [CheckerService],
})
export class CheckerModule {}
