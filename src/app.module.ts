import { Module } from '@nestjs/common';
import { PaymentController } from './payment/payment.controller';
import { PaymentModule } from './payment/payment.module';
import { PaymentService } from './payment/payment.service';

@Module({
  imports: [PaymentModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class AppModule {}
