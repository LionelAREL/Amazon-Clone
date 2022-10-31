import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { RecapComponent } from './pages/recap/recap.component';

const routes: Routes = [
  {
    path:"payment",
    component:RecapComponent,
    canActivate:[AuthGuard]
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
