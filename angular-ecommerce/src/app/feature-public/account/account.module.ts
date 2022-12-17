import { NgModule } from '@angular/core'
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { ConnexionSecurityComponent } from './connexion-security/connexion-security.component';
import { CreateAddressComponent } from './create-address/create-address.component';
import { AdressesComponent } from './adresses/adresses.component';
import { OrdersComponent } from './orders/orders.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedPublicModule } from '../shared-public/shared-public.module';


@NgModule({
  declarations: [
    AccountComponent,
    ConnexionSecurityComponent,
    CreateAddressComponent,
    AdressesComponent,
    OrdersComponent,
    AdressesComponent,
  ],
  imports: [
    SharedModule,
    AccountRoutingModule,
    SharedPublicModule
  ]
})
export class AccountModule { }
