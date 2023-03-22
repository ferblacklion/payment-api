import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from '../services/google/storage.service';
import { MediaService } from './media.service';
// jest.mock('../services/google/initFirebase', () => ({
//   initFirebase: jest.fn(() => ({
//     storage: jest.fn(() => ({ bucket: jest.fn() })),
//   })),
// }));
describe('MediaService', () => {
  let service: MediaService;
  const ConfigServiceMock = {
    get: jest.fn(() => ''),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        StorageService,
        {
          provide: ConfigService,
          useValue: ConfigServiceMock,
        },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
