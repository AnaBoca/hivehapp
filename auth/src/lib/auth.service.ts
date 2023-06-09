import { Injectable, NgZone } from '@angular/core';
import { User } from './auth.models';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReadableErrorMessage } from './readable-error-message.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private _snackBar: MatSnackBar,
    private readbleErrorMessage: ReadableErrorMessage
  ) {
    /* 
      Saving user data in Local Storage when logged in 
      and setting as null when logged out 
    */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        this._snackBar.open(
          this.readbleErrorMessage.getMessageFromCode(error)!,
          'Close',
          { duration: 5000 }
        );
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* 
        Call the SendVerificationMail() function 
        when new user sign up and returns promise 
        */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        this._snackBar.open(
          this.readbleErrorMessage.getMessageFromCode(error)!,
          'Close',
          { duration: 5000 }
        );
      });
  }

  // Send email verification when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this._snackBar.open(
          'Password reset email sent, check your inbox.',
          'Close',
          { duration: 5000 }
        );
      })
      .catch((error) => {
        this._snackBar.open(
          this.readbleErrorMessage.getMessageFromCode(error)!,
          'Close',
          { duration: 5000 }
        );
      });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);

    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']);
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);

        this.SetUserData(result.user);
      })
      .catch((error) => {
        this._snackBar.open(
          this.readbleErrorMessage.getMessageFromCode(error)!,
          'Close',
          { duration: 5000 }
        );
      });
  }

  /* 
    Setting up user data when: 
    signing in with username/password, 
    signing up with username/password, or 
    signing in with social auth provider in Firestore database using AngularFirestore + AngularFirestoreDocument service 
  */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
