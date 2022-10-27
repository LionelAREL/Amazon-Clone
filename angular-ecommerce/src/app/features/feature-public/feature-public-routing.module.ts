import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth.guard';
import { NoAuthGuard } from 'src/app/core/auth/no-auth.guard';
import { PublicLayoutComponentAuth } from 'src/app/layout/public-layout/public-layout-auth/public-layout.component';
import { PublicLayoutComponent } from 'src/app/layout/public-layout/public-layout-main/public-layout.component';
import { NotFoundComponent } from './error/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'},
  {
    path:'',
    component:PublicLayoutComponent,
    children:[
      {
        path:'',
        loadChildren: () => import('./home/home-routing.module').then(mod => mod.HomeRoutingModule),
      },
      {
        path:'',
        loadChildren: () => import('./product/product-routing.module').then(mod => mod.ProductRoutingModule),
      },
      {
        path:'',
        loadChildren: () => import('./cart/cart-routing.module').then(mod => mod.CartRoutingModule),
      },
      {
        canActivate:[AuthGuard],
        path:'account',
        loadChildren: () => import('./account/account-routing.module').then(mod => mod.AccountRoutingModule),
      },
      {
        path:'error',
        loadChildren: () => import('./error/error-routing.module').then(mod => mod.ErrorRoutingModule),
      },
      {
        path:'',
        loadChildren: () => import('./payment/payment-routing.module').then(mod => mod.PaymentRoutingModule),
      }
    ]},
  {
    path:'',
    component:PublicLayoutComponentAuth,
    children:[
      {
        canActivate:[NoAuthGuard],
        path:'',
        loadChildren: () => import('./auth/auth-routing.module').then(mod => mod.AuthRoutingModule),
      },
      {
        path: '**', 
        pathMatch: 'full',
        component:NotFoundComponent
      },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturePublicRoutingModule { }
