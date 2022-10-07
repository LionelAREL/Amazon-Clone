import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './pages/account/account.component';
import { ConnexionSecurityComponent } from './pages/connexion-security/connexion-security.component';
import { CreateAddressComponent } from './pages/create-address/create-address.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { AddressComponent } from './components/address/address.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdressesComponent } from './pages/adresses/adresses.component';
import { OrdersComponent } from './pages/orders/orders.component';


@NgModule({
  declarations: [
    AccountComponent,
    ConnexionSecurityComponent,
    CreateAddressComponent,
    AddAddressComponent,
    AddressComponent,
    AdressesComponent,
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AccountModule { }
