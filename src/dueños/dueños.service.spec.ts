import { Test, TestingModule } from '@nestjs/testing';
import { DueñosService } from './dueños.service';

describe('DueñosService', () => {
  let service: DueñosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DueñosService],
    }).compile();

    service = module.get<DueñosService>(DueñosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
