import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { FirestoreService } from '../services/google/firestore.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, FirestoreService],
})
export class PaymentModule {}
