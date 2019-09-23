import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loggedUser: any;
  constructor(private myservice: CommonService, private router: Router) { }
  ngOnInit(): void {
    this.loggedUser = this.myservice.loggedUser;
    if (this.myservice.isLoggedIn) {
      if (this.loggedUser.role === 'client') {
        this.router.navigate(['/']);
      }
    }
    console.log(this.myservice.isLoggedIn);


  }
  login() {
    console.log('login submit');
    this.myservice.login();
    this.loggedUser = this.myservice.loggedUser;
    if (this.myservice.isLoggedIn) {
      if (this.loggedUser.role === 'client') {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/user']);
    }
  }
}
