import { Injectable } from '@nestjs/common';
//import { FirestoreService } from 'src/services/google/firestore.service'; // fail test
import { FirestoreService } from '../services/google/firestore.service'; //good
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PatchPaymentDto } from './dto/patch-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private firestoreService: FirestoreService) {}
  create(createPaymentDto: CreatePaymentDto) {
    return this.firestoreService.create(createPaymentDto);
  }

  findAll() {
    return this.firestoreService.findAll();
  }
  findOne(id: string) {
    return this.firestoreService.findOne(id);
  }
  update(id: string, data: PatchPaymentDto) {
    return this.firestoreService.update(id, data);
  }
}
