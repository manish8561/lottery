import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.component.html'
})
export class ContactComponent implements OnInit {

  isLoggedIn = false;
  loggedUser: any;
  radioModel: string = 'Month';
  constructor(private router: Router, private myservice: CommonService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.myservice.isLoggedIn;
    this.loggedUser = this.myservice.loggedUser;
  }
}
