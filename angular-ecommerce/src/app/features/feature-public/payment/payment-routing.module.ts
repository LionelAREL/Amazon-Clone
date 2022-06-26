import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecapComponent } from './pages/recap/recap.component';

const routes: Routes = [
  {
    path:"payment",
    component:RecapComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
