import { Test, TestingModule } from '@nestjs/testing';
import { DueñosController } from './dueños.controller';

describe('DueñosController', () => {
  let controller: DueñosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DueñosController],
    }).compile();

    controller = module.get<DueñosController>(DueñosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
