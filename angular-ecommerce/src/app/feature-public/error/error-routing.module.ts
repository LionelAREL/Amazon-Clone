import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StripeComponent } from './stripe/stripe.component';

const routes: Routes = [
  {
    path: 'stripe',
    component: StripeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
