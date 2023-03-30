import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { FirestoreService } from '../services/google/firestore.service';
import { MediaService } from '../media/media.service';
import { StorageService } from '../services/google/storage.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, FirestoreService, MediaService, StorageService],
})
export class PaymentModule {}
