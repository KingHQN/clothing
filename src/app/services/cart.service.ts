import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private static readonly CartStorageKey = 'cart';

  private cart: Cart[];
  private filteredCart: Cart[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private totalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayCartSubject: BehaviorSubject<Cart[]> = new BehaviorSubject<Cart[]>([]);

  cart$: Observable<Cart[]> = this.displayCartSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();
  total$: Observable<number> = this.totalSubject.asObservable();

  constructor(private storageService: LocalStorageService) { }

  fetchFromLocalStorage() {
    this.cart = this.storageService.getValue<Cart[]>(CartService.CartStorageKey) || [];
    this.filteredCart = [...this.cart];
    this.updateCartData();
  }

  updateToLocalStorage() {
    this.storageService.setObject(CartService.CartStorageKey, this.cart);
    this.updateCartData();
  }

  setData(data) {
    this.displayCartSubject.next(data);
  }

  private updateCartData() {
    this.displayCartSubject.next(this.filteredCart);
    let quantity = 0;
    this.cart.forEach(item => {
      quantity += item.quantity;
    });
    this.lengthSubject.next(quantity);
    let total = 0;
    this.cart.forEach(item => {
      total += (item.quantity * item.price);
    });
    this.totalSubject.next(total);
  }

  addCart(product) {
    let productExists = false;
    for (let i in this.cart) {
      if (this.cart[i].product === product.name && this.cart[i].size === product.size && this.cart[i].color === product.color) {
        this.cart[i].quantity++;
        this.updateToLocalStorage();
        this.setData(this.cart);
        productExists = true;
        break;
      }
    }

    if (!productExists) {
      const date = new Date(Date.now()).getTime();
      const newCart = new Cart(date, product.image, product.name, product.size, product.color, 1, product.price);
      this.cart.unshift(newCart);
      this.updateToLocalStorage();
      this.setData(this.cart);
    }
  }

  minusQuantity(item) {
    const index = this.cart.findIndex(i => item === i);
    this.cart[index].quantity = this.cart[index].quantity - 1;
    this.updateToLocalStorage();
    this.setData(this.cart);
  }

  plusQuantity(item) {
    const index = this.cart.findIndex(i => item === i);
    this.cart[index].quantity = this.cart[index].quantity + 1;
    this.updateToLocalStorage();
    this.setData(this.cart);
  }

  delItemCart(item) {
    const index = this.cart.findIndex(i => item === i);
    this.cart.splice(index, 1);
    this.updateToLocalStorage();
    this.setData(this.cart);
  }
}
