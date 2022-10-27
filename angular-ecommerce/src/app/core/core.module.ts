import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CoreRoutingModule } from './core-routing.module';
import { CookieModule } from 'ngx-cookie';
import { AutoFocus } from './utils/autofocus';

@NgModule({
  declarations: [AutoFocus],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    CookieModule.withOptions()
  ],
  exports:[AutoFocus],
})
export class CoreModule { }
