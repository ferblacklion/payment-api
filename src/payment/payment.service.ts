import { Injectable } from '@nestjs/common';
import { FirestoreService } from 'src/services/google/firestore.service'; // fail test
//import { FirestoreService } from '../services/google/firestore.service'; //good
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private firestoreService: FirestoreService) {}
  create(createPaymentDto: CreatePaymentDto) {
    return this.firestoreService.create(createPaymentDto);
  }

  findAll() {
    return this.firestoreService.findAll();
  }
}
