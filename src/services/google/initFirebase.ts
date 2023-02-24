import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

let app: admin.app.App = null;

export function initFirebase(configService: ConfigService) {
  if (!app) {
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: configService.get<string>('PROJECT_ID'),
        clientEmail: configService.get<string>('CLIENT_EMAIL'),
        privateKey: configService.get<string>('PRIVATE_KEY'),
      }),
      databaseURL: configService.get<string>('DB_URL'),
      storageBucket: configService.get<string>('BUCKET_URL'),
    });
  }
  return app;
}
