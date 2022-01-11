import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';

const mockTaskService = {
  handleCron: jest.fn(),
};

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
