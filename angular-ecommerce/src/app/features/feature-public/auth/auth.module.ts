import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputCardComponent } from './components/input-card/input-card.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    InputCardComponent
  ],
  imports: [
    CommonModule, 
    AuthRoutingModule,
    ReactiveFormsModule,
    CoreModule,
  ]
})
export class AuthModule { }
