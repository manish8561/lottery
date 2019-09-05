import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../shared/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(private myservice: CommonService, private router: Router) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.myservice.isloggedIn);
    console.log(this.myservice.loggedUser);

  }
  login() {
    console.log('login submit');
    this.myservice.login();
    this.router.navigate(['/user']);
  }
}
