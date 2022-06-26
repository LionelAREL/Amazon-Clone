import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { ConnexionSecurityComponent } from './pages/connexion-security/connexion-security.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
  {
    path: 'connexion-security',
    component: ConnexionSecurityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
