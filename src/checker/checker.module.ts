import { Module } from '@nestjs/common';
import { CheckerController } from './checker.controller';
import { CheckerService } from './checker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checker } from './entities/checker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Checker])],
  controllers: [CheckerController],
  providers: [CheckerService],
})
export class CheckerModule {}
