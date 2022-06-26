import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './features/feature-public/error/pages/not-found/not-found.component';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./features/feature-public/feature-public-routing.module').then(mod => mod.FeaturePublicRoutingModule),
  },
  {
    path:'admin',
    loadChildren: () => import('./features/feature-admin/feature-admin-routing.module').then(mod => mod.FeatureAdminRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {onSameUrlNavigation: 'reload'},)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
