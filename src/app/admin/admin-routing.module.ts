import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageClothesComponent } from './manage-clothes/manage-clothes.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { AdminComponent } from './admin/admin.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      { path: 'clothing', component: ManageClothesComponent },
      { path: 'orders', component: ManageOrdersComponent },
      { path: '', component: AdminComponent, pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
