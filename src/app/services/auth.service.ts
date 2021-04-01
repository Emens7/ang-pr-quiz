import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$?: Observable<User | null | undefined>;
  
  constructor(
    public firebaseAuth: AngularFireAuth,
    public router: Router,
    public fireStore: AngularFirestore
    ) {

      this.user$ = this.firebaseAuth.authState.pipe(
        switchMap((user: any) => {
          if (user) {
            return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return of(null);
          }
        })
      );

    }


  async login(email: string, password: string) {
    try {
      const result = await this.firebaseAuth.signInWithEmailAndPassword(email, password);
      if (!result.user?.emailVerified) {
        alert('Please verify your email address!');
        return;
      }

      this.router.navigate(['/']);
    }
    catch(err: any) {
      if (err.code == 'auth/user-not-found' || err.code == 'auth/wrong-password') {
        alert('Invalid login credentials!');
      }
    }
  }

  async logout() {
    await this.firebaseAuth.signOut();
    this.router.navigate(['/login']);
  }

  async register(email: string, password: string, role: string) {
    const result = await this.firebaseAuth.createUserWithEmailAndPassword(email, password);

    const user: User = {
      uid: result.user?.uid,
      email: email,
      role: role === 'teacher' ? 'teacher' : 'student'
    }

    this.saveUserData(user);

    await this.sendVerificationEmail();

    this.router.navigate(['/verify-email']);

  }

  async sendVerificationEmail() {
    const user = await this.firebaseAuth.currentUser;
    await user?.sendEmailVerification();
  }

  async sendPasswordResetEmail(email: string) {
    return await this.firebaseAuth.sendPasswordResetEmail(email);
  }

  saveUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
    return userRef.set(user, { merge: true });
  }



}
