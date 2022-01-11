import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TerminusModule } from '@nestjs/terminus';
import { CheckerModule } from '../checker/checker.module';
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [TerminusModule, CheckerModule, NotifyModule],
  providers: [TaskService],
})
export class TaskModule {}
