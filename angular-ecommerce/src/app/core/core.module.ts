import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieModule } from 'ngx-cookie';
import { AutoFocus } from '../shared/directives/autofocus';
import { FeaturePublicModule } from '../feature-public/feature-public.module';
import { FeatureAdminModule } from '../feature-admin/feature-admin.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeaturePublicModule,
    FeatureAdminModule,
    HttpClientModule,
    CookieModule.withOptions()
  ]
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error('CoreModule is already loaded.');
		}
	}
}

