import { Test, TestingModule } from '@nestjs/testing';
import { NotifyService } from './notify.service';
import {
  IncomingWebhookResult,
  IncomingWebhookSendArguments,
} from '@slack/client';

const mockNotifyService = {
  notify: jest.fn(),
};

describe('NotifyService', () => {
  let service: NotifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: NotifyService,
          useValue: mockNotifyService,
        },
      ],
    }).compile();

    service = module.get<NotifyService>(NotifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
