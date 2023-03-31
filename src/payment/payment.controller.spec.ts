import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { FirestoreService } from '../services/google/firestore.service';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { MediaService } from '../media/media.service';
import { StorageService } from '../services/google/storage.service';

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        PaymentService,
        FirestoreService,
        MediaService,
        StorageService,
      ],
      imports: [ConfigModule.forRoot()],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
