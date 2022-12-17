import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddressFormComponent } from './address-form/address-form.component';
import { ReturnToPageComponent } from './return-to-page/return-to-page.component';



@NgModule({
  declarations: [
    AddressFormComponent,
    ReturnToPageComponent
  ],
  imports:[
    SharedModule
  ],
  exports:[
    ReturnToPageComponent,
    AddressFormComponent,
  ]
})
export class SharedPublicModule { }
