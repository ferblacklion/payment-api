import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from '../services/google/storage.service';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
// jest.mock('../services/google/initFirebase', () => ({
//   initFirebase: jest.fn(() => ({
//     storage: jest.fn(() => ({ bucket: jest.fn() })),
//   })),
// }));
describe('MediaController', () => {
  let controller: MediaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [MediaService, StorageService, ConfigService],
    }).compile();

    controller = module.get<MediaController>(MediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
