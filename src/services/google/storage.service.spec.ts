import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storage.service';

// jest.mock('./initFirebase', () => ({
//   initFirebase: jest.fn(() => ({
//     storage: jest.fn(() => ({ bucket: jest.fn() })),
//   })),
// }));
describe('StorageService', () => {
  let service: StorageService;
  const ConfigServiceMock = {
    get: jest.fn(() => ''),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StorageService,
        {
          provide: ConfigService,
          useValue: ConfigServiceMock,
        },
      ],
    }).compile();

    service = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
