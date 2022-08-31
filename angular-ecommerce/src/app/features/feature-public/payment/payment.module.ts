import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { RecapComponent } from './pages/recap/recap.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    RecapComponent,
    CartListComponent,
    EditAddressComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    MatExpansionModule,
    BrowserAnimationsModule,
  ]
})
export class PaymentModule { }
