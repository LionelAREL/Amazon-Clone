import { NgModule } from '@angular/core';
import { FeaturePublicRoutingModule } from './feature-public-routing.module';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { ErrorModule } from './error/error.module';
import { AccountModule } from './account/account.module';
import { SharedModule } from '../shared/shared.module';
import { SharedPublicModule } from './shared-public/shared-public.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    FeaturePublicRoutingModule,
    HomeModule,
    // AuthModule,
    ProductModule,
    CartModule,
    PaymentModule,
    ErrorModule,
    AccountModule,
    SharedPublicModule,
  ]
})
export class FeaturePublicModule { }
