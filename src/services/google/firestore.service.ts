import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreatePaymentDto } from 'src/payment/dto/create-payment.dto';
import { Payment } from 'src/entities/payment';
import { ConfigService } from '@nestjs/config';
import { pipe, filter, sort, ifElse, always, map, isNil } from 'ramda';
import { initFirebase } from './initFirebase';

const COLLECTION_NAME = 'payments-v2';
const LIMIT_DOCS = 50;

@Injectable()
export class FirestoreService {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> =
    null;

  constructor(private configService: ConfigService) {
    const app = initFirebase(this.configService);
    this.collection = app.firestore().collection(COLLECTION_NAME);
  }
  async create(paymentData: CreatePaymentDto) {
    try {
      const payment = await this.collection
        .doc()
        .set(this.createPayload(paymentData));
      return payment?.writeTime
        ? { success: true, write_time: payment.writeTime }
        : { success: false };
    } catch (e) {
      throw e;
    }
  }
  async findAll(): Promise<Payment[]> {
    try {
      const paymentData = await this.collection
        .orderBy('datetime', 'desc')
        .limit(LIMIT_DOCS)
        .get();

      return this.mapper(paymentData?.docs);
    } catch {
      return [];
    }
  }

  transform(data: admin.firestore.DocumentData): Payment {
    return {
      id: data.id,
      name: data?.name ?? null,
      person: data?.person ?? null,
      datetime: data?.datetime ?? null,
    };
  }
  filter(payments: Payment[]) {
    return pipe(
      filter((p) => p.datetime),
      sort(
        (a, b) =>
          new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
      ),
    )(payments);
  }
  mapper(data): Payment[] {
    return ifElse(
      isNil(),
      always([]),
      map((doc) => {
        const id = doc?.id;
        const data: Payment = { id, ...doc.data() };
        return this.transform(data);
      }),
    )(data);
  }
  createPayload(paymentData: CreatePaymentDto) {
    const payload: Omit<Payment, 'id'> = {
      name: paymentData.name,
      person: paymentData.person,
      datetime: new Date().getTime(),
    };
    return payload;
  }
}
