import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

let app: admin.app.App = null;

export function initFirebase(configService: ConfigService) {
  if (!app) {
    const sa = JSON.parse(configService.get<string>('SA'));
    app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: configService.get<string>('PROJECT_ID'),
        clientEmail: configService.get<string>('CLIENT_EMAIL'),
        privateKey: sa.privateKey.replace(/\\n/gm, '\n'),
      }),
      databaseURL: configService.get<string>('DB_URL'),
      storageBucket: configService.get<string>('BUCKET_URL'),
    });
  }
  return app;
}
