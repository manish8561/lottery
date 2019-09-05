import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { FrontComponent } from './front.component';
import { FrontRoutingModule } from './front-routing.module';

@NgModule({
  imports: [
    FormsModule,
    FrontRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ FrontComponent ]
})
export class FrontModule { }
