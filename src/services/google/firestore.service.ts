import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { CreatePaymentDto } from 'src/payment/dto/create-payment.dto';
import { Payment } from 'src/entities/payment';
import { ConfigService } from '@nestjs/config';
import { pipe, filter, sort, ifElse, always, map, isNil } from 'ramda';
import { initFirebase } from './initFirebase';
import { PatchPaymentDto } from 'src/payment/dto/patch-payment.dto';
import { Timestamp } from '@firebase/firestore';

const LIMIT_DOCS = 25;

@Injectable()
export class FirestoreService {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData> =
    null;

  constructor(private configService: ConfigService) {
    const app = initFirebase(this.configService);
    this.collection = app
      .firestore()
      .collection(
        configService.get<string>('COLLECTION_NAME') || 'payments-v2',
      );
  }
  async create(paymentData: CreatePaymentDto) {
    try {
      const payment = this.collection.doc();
      const newPayment = await payment.set(this.createPayload(paymentData));
      return newPayment?.writeTime
        ? { id: payment.id, success: true }
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
    } catch (e) {
      console.log('e :>> ', e);
      return [];
    }
  }

  transform(data: admin.firestore.DocumentData): Payment {
    return {
      id: data.id,
      name: data?.name || data?.type || null,
      person: data?.person ?? null,
      image: data?.image ?? null,
      updated: data?.updated ?? null,
      datetime: data?.datetime.toDate
        ? data?.datetime?.toDate()
        : data?.datetime ?? null,
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
      ...paymentData,
      name: paymentData.name,
      person: paymentData.person,
      datetime: Timestamp.fromDate(new Date()).toDate(),
    };
    return payload;
  }

  async findOne(id: string): Promise<Partial<Payment> | null> {
    try {
      const paymentData = await this.collection.doc(id).get();
      return paymentData.exists ? paymentData.data() : null;
    } catch {
      return null;
    }
  }
  async update(id: string, data: PatchPaymentDto): Promise<boolean> {
    try {
      const paymentData = await this.collection
        .doc(id)
        .update({ ...data, updated: Timestamp.fromDate(new Date()).toDate() });
      if (paymentData.writeTime) return true;
      return false;
    } catch {
      return false;
    }
  }
}
