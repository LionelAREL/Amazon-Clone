import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { AccountComponent } from './account/account.component';
import { AdressesComponent } from './adresses/adresses.component';
import { ConnexionSecurityComponent } from './connexion-security/connexion-security.component';
import { CreateAddressComponent } from './create-address/create-address.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'connexion-security',
    component: ConnexionSecurityComponent,
    
  },
  {
    path: 'adresses',
    component: AdressesComponent,
  },
  {
    path: 'adresses/create',
    component: CreateAddressComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
