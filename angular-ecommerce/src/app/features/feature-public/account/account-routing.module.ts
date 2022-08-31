import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { AccountComponent } from './pages/account/account.component';
import { ConnexionSecurityComponent } from './pages/connexion-security/connexion-security.component';
import { CreateAddressComponent } from './pages/create-address/create-address.component';

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
    path: 'create-address',
    component: CreateAddressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
