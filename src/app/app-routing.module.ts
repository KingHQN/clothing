import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ClothesComponent } from './components/clothes/clothes.component';
import { ClothesListComponent } from './components/clothes/clothes-list/clothes-list.component';
import { ClothesItemComponent } from './components/clothes/clothes-list/clothes-item/clothes-item.component';
import { CartComponent } from './components/cart/cart.component';
import { CartListComponent } from './components/cart/cart-list/cart-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quanao',
    component: ClothesComponent,
    children: [
      { path: '', component: ClothesComponent, pathMatch: 'full' },
      { path: ':category', component: ClothesComponent },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  {
    path: 'cart',
    children: [
      { path: '', component: CartComponent, pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
  // { path: '**', component: PageNotFoundComponent }
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
export const routingComponents = [HomeComponent, PageNotFoundComponent, ClothesComponent, ClothesListComponent, ClothesItemComponent, CartComponent, CartListComponent];
