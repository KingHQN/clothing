import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { ClothesComponent } from './components/clothes/clothes.component';
import { ClothesListComponent } from './components/clothes/clothes-list/clothes-list.component';
import { ClothesItemComponent } from './components/clothes/clothes-list/clothes-item/clothes-item.component';
import { CartComponent } from './components/cart/cart.component';
import { CartListComponent } from './components/cart/cart-list/cart-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'quanao',
    component: ClothesComponent,
    children: [
      { path: ':category', component: ClothesListComponent },
      { path: '', component: ClothesListComponent, pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  { path: 'cart', component: CartComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // { enableTracing: true } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// tslint:disable-next-line: max-line-length
export const routingComponents = [HomeComponent, UsersComponent, PageNotFoundComponent, ClothesComponent, ClothesListComponent, ClothesItemComponent, CartComponent, CartListComponent];
