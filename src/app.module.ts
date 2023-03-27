import { Module } from '@nestjs/common';
import { PaymentModule } from './payment/payment.module';
import { PaymentService } from './payment/payment.service';
import { FirestoreService } from './services/google/firestore.service';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PaymentModule,
    MediaModule,
  ],
  controllers: [AppController],
  providers: [PaymentService, FirestoreService],
})
export class AppModule {}
