import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userservice: UserService,private auth: AuthService, private router: Router) { }
  // if the user is logged in we can return true, otherwise we going to navigate them to the login page and return false
  canActivate( route,state:RouterStateSnapshot): Observable<boolean> {

      return this.auth.user$.pipe(
        map((user) => {
          if (user) {

            this.userservice.save(user);
            return true;
          } else {
            this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
            return false;
          }
        })
      );

  }

}
