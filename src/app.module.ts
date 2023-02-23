import { Module } from '@nestjs/common';
import { PaymentController } from './payment/payment.controller';
import { PaymentModule } from './payment/payment.module';
import { PaymentService } from './payment/payment.service';
import { FirestoreService } from './services/google/firestore.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PaymentModule],
  controllers: [PaymentController],
  providers: [PaymentService, FirestoreService],
})
export class AppModule {}
