import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // here we can subscribe to user observable of authentication service
  // when the user loged in , we can read the local storage and redirect them
  // Note------
  // Every time the user is logged in or logged out this observalbe is going to emit new value
  // if he logout we don't have a user object, we receive null , that's why we have if condition statement
  // Clarifaction----
  // here we subcribe to this observable , and there's no unsubscribe
  // it doesn't matter , in theory yes in practise NO
  // because app compoent is the root compoent of our application, so we have a single instance of this component in the dom
  // so, when this implementation we have a single subcriptoin to this user observable
  // and ofcourse this subscrption will be there throught the life time of our application
  // if the user navigate away from our application this subcription will not work any more
  // SO, in this particular case it doesn't realy matter to unsubscribe 
  // but for other components that are added and removed dynamically in the dom ,
  // We should make sure to Unsubscribe , because if we don't unsubcribe from each of the subcription
  // they're going to leed to memroy leaks
  // But in this case it doesn't really matter
  // But if you wanna want to unsubcribe feel free to implement  onDestroy interface

  constructor(private userService:UserService, private auth: AuthService, private router: Router) {
    auth.user$.subscribe(user => {
      if (user) {
        this.userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl')
        router.navigateByUrl(returnUrl);
      }
    })
  }
}
