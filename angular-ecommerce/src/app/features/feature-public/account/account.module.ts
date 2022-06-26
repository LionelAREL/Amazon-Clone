import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './pages/account/account.component';
import { ConnexionSecurityComponent } from './pages/connexion-security/connexion-security.component';
import { CreateAddressComponent } from './pages/create-address/create-address.component';


@NgModule({
  declarations: [
    AccountComponent,
    ConnexionSecurityComponent,
    CreateAddressComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
