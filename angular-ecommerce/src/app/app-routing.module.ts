import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./feature-public/feature-public-routing.module').then(mod => mod.FeaturePublicRoutingModule),
  },
  {
    path:'admin',
    loadChildren: () => import('./feature-admin/feature-admin-routing.module').then(mod => mod.FeatureAdminRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
