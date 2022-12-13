import { NgModule } from '@angular/core';
import { PublicLayoutComponent } from './public-layout/public-layout-main/public-layout.component';
import { PublicLayoutComponentAuth } from './public-layout/public-layout-auth/public-layout.component';
import { AdminHeaderComponent } from './nav-bar/admin-header/admin-header.component';
import { PublicFooterAuthComponent } from './nav-bar/public-footer-auth/public-footer.component';
import { PublicFooterComponent } from './nav-bar/public-footer/public-footer.component';
import { PublicHeaderComponent } from './nav-bar/public-header/public-header.component';
import { PublicHeaderAuthComponent } from './nav-bar/public-header-auth/public-header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoFocus } from './directives/autofocus';



@NgModule({
  declarations: [
    PublicLayoutComponent,
    PublicLayoutComponentAuth,
    AdminHeaderComponent,
    PublicFooterComponent,
    PublicFooterAuthComponent,
    PublicHeaderComponent,
    PublicHeaderAuthComponent,
    AutoFocus,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    PublicLayoutComponent,
    PublicLayoutComponentAuth,
    AutoFocus,
  ]
})
export class SharedModule { }
