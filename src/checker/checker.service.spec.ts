import { Test, TestingModule } from '@nestjs/testing';
import { CheckerService } from './checker.service';
import { Checker } from './entities/checker.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

const mockCheckerRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
  createQueryBuilder: jest.fn().mockReturnValue({
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockReturnThis(),
    getRawMany: jest.fn().mockReturnThis(),
    length: jest.fn(),
  }),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('CheckerService', () => {
  let service: CheckerService;
  let checkerRepository: MockRepository<Checker>;

  const createData = {
    name: 'test',
    url: 'https://naver.com',
    allowStatus: [200],
    disallowStatus: ['*'],
    chanel: ['slack'],
    isReset: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckerService,
        {
          provide: getRepositoryToken(Checker),
          useValue: mockCheckerRepository(),
        },
      ],
    }).compile();

    service = module.get<CheckerService>(CheckerService);
    checkerRepository = module.get<MockRepository<Checker>>(
      getRepositoryToken(Checker),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be find', async () => {
      jest
        .spyOn(checkerRepository.createQueryBuilder(), 'getMany')
        .mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('throw not found exception', async () => {
      try {
        await service.findOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('not found checker 999');
      }
    });
  });

  describe('create', () => {
    it('should fail on exception', async () => {
      try {
        checkerRepository.save.mockRejectedValue('save error');
        await service.create(createData);
      } catch (e) {
        expect(e).toEqual('save error');
      }
    });

    it('should create checkers', async () => {
      checkerRepository.save.mockResolvedValue(createData);
      const result = await service.create(createData);

      expect(checkerRepository.save).toHaveBeenCalledTimes(1);
      expect(checkerRepository.save).toHaveBeenCalledWith(createData);
      expect(result).toEqual(createData);
    });
  });

  describe('start scheduler', () => {
    it('already start exception', async () => {
      try {
        checkerRepository.findOne.mockRejectedValue('already in checker');
        await service.startSchedule(1);
      } catch (e) {
        expect(e).toEqual('already in checker');
      }
    });

    it('run schedule', async () => {
      checkerRepository.findOne.mockResolvedValue(createData);
      checkerRepository.save.mockResolvedValue(createData);
      const result = await service.startSchedule(1);
      expect(result).toEqual('checker is running');
    });
  });

  describe('stop scheduler', () => {
    it('already start exception', async () => {
      try {
        checkerRepository.findOne.mockRejectedValue('already in stopped');
        await service.stopSchedule(1);
      } catch (e) {
        expect(e).toEqual('already in stopped');
      }
    });

    it('run schedule', async () => {
      checkerRepository.findOne.mockResolvedValue(createData);
      checkerRepository.save.mockResolvedValue(createData);
      const result = await service.stopSchedule(1);
      expect(result).toEqual('checker is stopped');
    });
  });

  it.todo('startSchedule -> RUN 으로 변경됐는지 ?');
  it.todo('stopSchedule -> STOP 으로 변경됐는지 ?');
});
