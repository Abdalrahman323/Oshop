import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { appUser } from '../models/app.user';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private UserService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

    //Another RESOLVE
    // this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    //   .then(result => {
    //     this.router.navigateByUrl(returnUrl);
    //   }


  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  get appUser$(): Observable<appUser> {
    return this.user$
      .pipe(switchMap(user => {
        if (user) return this.UserService.get(user.uid).valueChanges();
        return of(null);

      }

      ))
  }
}
