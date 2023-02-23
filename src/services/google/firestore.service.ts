import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreatePaymentDto } from 'src/payment/dto/create-payment.dto';
import { Payment } from 'src/entities/payment';
import { ConfigService } from '@nestjs/config';

const COLLECTION_NAME = 'payments-v2';
let app = null;

@Injectable()
export class FirestoreService {
  private db: admin.firestore.Firestore = null;
  private collection = null;

  constructor(private configService: ConfigService) {
    if (!app) {
      app = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: this.configService.get<string>('PROJECT_ID'),
          clientEmail: this.configService.get<string>('CLIENT_EMAIL'),
          privateKey: this.configService.get<string>('PRIVATE_KEY'),
        }),
        databaseURL: this.configService.get<string>('DB_URL'),
      });
    }
    this.db = app.firestore();
    this.collection = this.db.collection(COLLECTION_NAME);
  }
  async create(paymentData: CreatePaymentDto) {
    try {
      const payload: Payment = {
        name: paymentData.name,
        person: paymentData.person,
        datetime: new Date().getTime(),
      };
      const payment = await this.collection.doc().set(payload);
      return payment ? { success: true } : { success: false };
    } catch (e) {
      throw e;
    }
  }
  async findAll(): Promise<Payment[]> {
    try {
      const paymentData = await this.collection.get();
      const payments: Payment[] = !paymentData.empty
        ? paymentData.docs.map((doc) => {
            const data = doc.data();
            return this.transform(data);
          })
        : [];
      return payments;
    } catch {
      return [];
    }
  }

  transform(data: admin.firestore.DocumentData): Payment {
    return {
      name: data?.name ?? null,
      person: data?.person ?? null,
      datetime: data?.datetime ?? null,
    };
  }
}
