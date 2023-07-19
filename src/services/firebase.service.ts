import { Injectable } from '@nestjs/common';
// import admin from 'firebase-admin';
// import * as firebaseKey from './funz-task-management-firebase-adminsdk.json';

@Injectable()
export class FirebaseAdminService {
  constructor() {
    // admin.initializeApp({
    //   credential: admin.credential.cert({
    //     // projectId: firebaseKey.project_id,
    //     // clientEmail: firebaseKey.client_email,
    //     // privateKey: firebaseKey.private_key,
    //   }),
    // });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async verifyToken(idToken: string) {
    // return admin.auth().verifyIdToken(idToken);
  }
}
