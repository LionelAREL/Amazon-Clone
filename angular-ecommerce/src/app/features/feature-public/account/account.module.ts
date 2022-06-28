import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './pages/account/account.component';
import { ConnexionSecurityComponent } from './pages/connexion-security/connexion-security.component';
import { CreateAddressComponent } from './pages/create-address/create-address.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { AddressComponent } from './components/address/address.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccountComponent,
    ConnexionSecurityComponent,
    CreateAddressComponent,
    AddAddressComponent,
    AddressComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AccountModule { }
