import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Checker, CheckerStatus } from './entities/checker.entity';
import { Repository } from 'typeorm';
import { CreateCheckerDto } from './dto/create-checker.dto';

@Injectable()
export class CheckerService {
  constructor(
    @InjectRepository(Checker)
    private checkerRepository: Repository<Checker>,
  ) {}

  findAll(): Promise<Checker[]> {
    return this.checkerRepository
      .createQueryBuilder('checker')
      .where('status = :status', { status: CheckerStatus.RUN })
      .getRawMany();
  }

  findOne(checkerId: number): Promise<Checker> {
    const checker = this.checkerRepository.findOne(checkerId);

    if (!checker) {
      throw new NotFoundException(`not found checker ${checkerId}`);
    }

    return checker;
  }

  async create(checkerData: CreateCheckerDto): Promise<Checker> {
    const checker = new Checker();
    checker.name = checkerData.name;
    checker.url = checkerData.url;
    checker.allowStatus = checkerData.allowStatus;
    checker.disallowStatus = checkerData.disallowStatus;
    checker.chanel = checkerData.chanel;
    checker.isReset = checkerData.isReset;

    try {
      if (checker?.status) {
        checker.status = checkerData.status;
      }

      return await this.checkerRepository.save(checker);
    } catch (e) {
      throw e;
    }
  }

  async startSchedule(id: number) {
    const checker = await this.findOne(id);

    if (checker.status === CheckerStatus.RUN) {
      return 'already in checker';
    }

    checker.status = CheckerStatus.RUN;

    try {
      await this.checkerRepository.save(checker);
      return 'checker is running';
    } catch (e) {
      throw e;
    }
  }

  async stopSchedule(id: number) {
    const checker = await this.checkerRepository.findOne(id);

    if (checker.status === CheckerStatus.STOP) {
      return 'already stopped';
    }

    checker.status = CheckerStatus.RUN;

    try {
      await this.checkerRepository.save(checker);
      return 'checker is stopped';
    } catch (e) {
      throw e;
    }
  }
}
