import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StripeComponent } from './pages/stripe/stripe.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    StripeComponent
  ],
  imports: [
    CommonModule,
    ErrorRoutingModule
  ]
})
export class ErrorModule { }
