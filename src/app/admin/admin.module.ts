import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageClothesComponent } from './manage-clothes/manage-clothes.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { AdminComponent } from './admin/admin.component';


@NgModule({
  declarations: [ManageClothesComponent, ManageOrdersComponent, AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
