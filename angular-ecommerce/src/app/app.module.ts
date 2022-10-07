import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { FeatureAdminModule } from './features/feature-admin/feature-admin.module';
import { FeaturePublicModule } from './features/feature-public/feature-public.module';
import { PublicHeaderComponent } from './layout/nav-bar/public-header/public-header.component';
import { PublicFooterComponent } from './layout/nav-bar/public-footer/public-footer.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout-main/public-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminFooterComponent } from './layout/nav-bar/admin-footer/admin-footer.component';
import { AdminHeaderComponent } from './layout/nav-bar/admin-header/admin-header.component';
import { environment } from '../environments/environment';
import { PublicLayoutComponentAuth } from './layout/public-layout/public-layout-auth/public-layout.component';
import { PublicHeaderAuthComponent } from './layout/nav-bar/public-header-auth/public-header.component';
import { PublicFooterAuthComponent } from './layout/nav-bar/public-footer-auth/public-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicHeaderComponent,
    PublicFooterComponent,
    PublicLayoutComponent,
    PublicLayoutComponentAuth,
    AdminLayoutComponent,
    AdminFooterComponent,
    AdminHeaderComponent,
    PublicHeaderAuthComponent,
    PublicFooterAuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    FeatureAdminModule,
    FeaturePublicModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
