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

  describe('notify()', () => {
    it('should notify to slack', async () => {
      const requestNotify: IncomingWebhookSendArguments = {
        text: '(test-message) testing..',
      };
      const resultNotify: IncomingWebhookResult = {
        text: 'ok',
      };
      jest
        .spyOn(service, 'notify')
        .mockImplementation(
          async (arg: IncomingWebhookSendArguments) => resultNotify,
        );

      const result = await service.notify(requestNotify);

      expect(result).toEqual(resultNotify);
      expect(service.notify).toHaveBeenCalledTimes(1);
      expect(service.notify).toHaveBeenCalledWith(requestNotify);
    });
  });
});
